/**
 *
 * Состояния игры
 *
 * В этом модуле описаны все возможные состояния игры: начало, пауза и конец, сброс, автоматическое падение, начало
 * падения следующего тетромино, очистка линий и начисление очков.
 */

import { List } from 'immutable';

import { store } from '../app/store';
import { wait, isOver, isClear } from '../unit';
import { BLANK_LINE, SPEEDS, EACH_LINES, blankMatrix, POINTS } from '../unit/constants';
import { audio } from './audio';
import {
  setRunSpeed,
  setClearLines,
  setMatrix,
  nextBlock,
  moveBlock,
  setLock,
  setReset,
  setPause,
  setPoints,
  setMax,
} from '../containers/Matrix/matrixSlice';

const getStartMatrix = (startLines) => {
  const color = [
    'turquoise',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
  ]
  
  const colorToggle = store.getState().colorToggle.value;
  
  const getLine = (min, max) => {
    const count = parseInt((((max - min) + 1) * Math.random()) + min, 10);
    const line = [];
    
    for (let i = 0; i < count; i++) {
      line.push(colorToggle ? color[Math.floor(Math.random() * color.length)] : 1);
    }
    
    for (let i = 0, len = 10 - count; i < len; i++) {
      const index = parseInt(((line.length + 1) * Math.random()), 10);
      line.splice(index, 0, 0);
    }

    return List(line);
  };
  
  let startMatrix = List([]);

  for (let i = 0; i < startLines; i++) {
    if (i <= 2) { // 0-3
      startMatrix = startMatrix.push(getLine(5, 8));
    } else if (i <= 6) { // 4-6
      startMatrix = startMatrix.push(getLine(4, 9));
    } else { // 7-9
      startMatrix = startMatrix.push(getLine(3, 9));
    }
  }
  
  for (let i = 0, len = 20 - startLines; i < len; i++) {
    startMatrix = startMatrix.unshift(List(BLANK_LINE));
  }
  
  return startMatrix;
};

const states = {
  fallInterval: null,
  
  /**
   *
   * Начало игры
   *
   *
   */
  start: () => {
    if (audio.start) {
      audio.start();
    }
    
    const state = store.getState();
    
    store.dispatch(setRunSpeed(state.matrix.speedStart));
    const startLines = state.matrix.startLines;
    const startMatrix = getStartMatrix(startLines);
    store.dispatch(setMatrix(startMatrix));
    store.dispatch(moveBlock({ type: state.matrix.next }));
    store.dispatch(nextBlock());
    states.auto();
  },
  
  /**
   *
   * Автоматическое падение тетромино
   *
   * вызывается из состояния start
   */
  auto: (timeout) => {
    const out = (timeout < 0 ? 0 : timeout);
    let state = store.getState();
    let current = state.matrix.current;
    
    const fall = () => {
      state = store.getState();
      current = state.matrix.current;
      const next = current.fall();
      
      if (wait(next, state.matrix.value)) {
        store.dispatch(moveBlock(next));
        states.fallInterval = setTimeout(fall, SPEEDS[state.matrix.speedRun - 1]);
      } else {
        let matrix = state.matrix.value;
        const shape = current && current.shape;
        const xy = current && current.xy;
        const colorToggle = state.colorToggle.value;
        const color = current && current.color;
        
        // m - массив в фигуре тетромино, n - число в массиве, k - возрастающий индекс определяемой функции
        shape.forEach((m, k1) => (
          m.forEach((n, k2) => {
            if (n && xy.get(0) + k1 >= 0) {
              let line = matrix.get(xy.get(0) + k1);
              line = line.set(xy.get(1) + k2, colorToggle ? color : 1);
              matrix = matrix.set(xy.get(0) + k1, line);
            }
          })
        ));
        
        states.nextAround(matrix);
      }
    };
    
    clearTimeout(states.fallInterval);
    states.fallInterval = setTimeout(fall,
      out === undefined ? SPEEDS[state.matrix.speedRun - 1] : out);
  },
  
  /**
   *
   * Падение следующего тетромино
   *
   * вызывается из состояния auto
   */
  nextAround: (matrix, stopDownTrigger) => {
    clearTimeout(states.fallInterval);
    store.dispatch(setLock(true));
    store.dispatch(setMatrix(matrix));
    
    if (typeof stopDownTrigger === 'function') {
      stopDownTrigger();
    }
    
    if (isClear(matrix)) {
      if(audio.clear) {
        audio.clear();
      }
    }
    
    if (isOver(matrix)) {
      if (audio.gameover) {
        audio.gameover();
      }
      
      states.startOver();
      return;
    }
    
    const addPoints = store.getState().matrix.points + (store.getState().matrix.speedRun * 10);
    states.dispatchPoints(addPoints);
    
    setTimeout(() => {
      store.dispatch(setLock(false));
      store.dispatch(moveBlock({ type: store.getState().matrix.next }));
      store.dispatch(nextBlock());
      states.auto();
    }, 100);
  },
  
  /**
   *
   * Очистка линий
   *
   * вызывается из контейнера Matrix
   */
  clearLines: (matrix, lines) => {
    const state = store.getState();
    let newMatrix = matrix;
    
    lines.forEach(n => {
      newMatrix = newMatrix.splice(n, 1);
      newMatrix = newMatrix.unshift(List(BLANK_LINE));
    });
    
    store.dispatch(setMatrix(newMatrix));
    store.dispatch(moveBlock({ type: state.matrix.next }));
    store.dispatch(nextBlock());
    states.auto();
    store.dispatch(setLock(false));
    const clearLines = state.matrix.clearLines + lines.length;
    store.dispatch(setClearLines(clearLines));

    const addPoints = store.getState().matrix.points +
      POINTS[lines.length - 1];
    states.dispatchPoints(addPoints);

    const speedAdd = Math.floor(clearLines / EACH_LINES);
    let speedNow = state.matrix.speedStart + speedAdd;
    speedNow = speedNow > 6 ? 6 : speedNow;
    store.dispatch(setRunSpeed(speedNow));
  },
  
  /**
   *
   * Сброс
   *
   * вызывается при нажатии клавиши 'a'
   */
  startOver: () => {
    clearTimeout(states.fallInterval);
    store.dispatch(setLock(true));
    store.dispatch(setReset(true));
    store.dispatch(setPause(false));
    store.dispatch(setPoints(0));
  },
  
  /**
   *
   * Конец игры
   *
   * вызывается из контейнера Matrix
   */
  endOver: () => {
    store.dispatch(setMatrix(blankMatrix));
    store.dispatch(moveBlock({ reset: true }));
    store.dispatch(setReset(false));
    store.dispatch(setLock(false));
    store.dispatch(setClearLines(0));
    store.dispatch(setPoints(0));
  },
  
  /**
   *
   * Пауза
   *
   * вызывается при нажатии клавиши 's'
   */
  pause: (isPause) => {
    store.dispatch(setPause(isPause));
    if (isPause) {
      clearTimeout(states.fallInterval);
      return;
    }
    states.auto();
  },
  
  /**
   *
   * Начисление очков
   *
   * вызывается из состояния clearLines
   */
  dispatchPoints: (point) => {
    store.dispatch(setPoints(point));
    if (point > 0 && point > store.getState().matrix.max) {
      store.dispatch(setMax(point));
    }
  },
}

export default states;
