import { wait } from '../../unit';
import event from '../event';
import { down as down_key }  from '../../containers/Keyboard/keyboardSlice';
import { moveBlock, setStartLines } from '../../containers/Matrix/matrixSlice';
import states from '../states';
import { audio } from '../audio';

const down = (store) => {
  store.dispatch(down_key(true));
  
  if (store.getState().matrix.current !== null) {
    event.down({
      key: 'down',
      begin: 40,
      interval: 40,
      callback: (stopDownTrigger) => {
        const state = store.getState();
        
        if (state.matrix.lock) {
          return;
        }
        
        if (audio.move) {
          audio.move();
        }
        
        const current = state.matrix.current;
        
        if (current === null) {
          return;
        }
        
        if (state.matrix.pause) {
          states.pause(false);
          return;
        }
        
        const next = current.fall();
        
        if (wait(next, state.matrix.value)) {
          store.dispatch(moveBlock(next));
          states.auto();
        } else {
          let matrix = state.matrix.value;
          const shape = current.shape;
          const xy = current.xy;
          const colorToggle = state.colorToggle.value;
          const color = current.color;
          
          shape.forEach((m, k1) => (
            m.forEach((n, k2) => {
              if (n && xy.get(0) + k1 >= 0) {
                let line = matrix.get(xy.get(0) + k1);
                line = line.set(xy.get(1) + k2, colorToggle ? color : 1);
                matrix = matrix.set(xy.get(0) + k1, line);
              }
            })
          ));
          
          states.nextAround(matrix, stopDownTrigger);
        }
      },
    });
  } else {
    event.down({
      key: 'down',
      begin: 200,
      interval: 100,
      callback: () => {
        if (store.getState().matrix.lock) {
          return;
        }
        
        const state = store.getState();
        const current = state.matrix.current;
        
        if (current) {
          return;
        }
        
        if (audio.move) {
          audio.move();
        }
        
        let startLines = state.matrix.startLines;
        startLines = startLines - 1 < 0 ? 10 : startLines - 1;
        store.dispatch(setStartLines(startLines));
      },
    });
  }
};

const up = (store) => {
  store.dispatch(down_key(false));
  event.up({
    key: 'down',
  });
};


export default {
  down,
  up,
};
