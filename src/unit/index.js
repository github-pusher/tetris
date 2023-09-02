import { TETROMINO_TYPE, STORAGE_KEY } from './constants';

export const unit = {
  // получить следующий тип тетромино
  getNextType() {
    const len = TETROMINO_TYPE.length;
    return TETROMINO_TYPE[Math.floor(Math.random() * len)];
  },
  
  // тетромино достигло определённой позиции?
  wait(next, matrix) {
    const xy = next.xy;
    const shape = next.shape;
    const horizontal = shape.get(0).size;
    
    return shape.every((m, k1) => (
      m.every((n, k2) => {
        // тетромино достигло левого края стакана?
        if (xy[1] < 0) {
          return false;
        }
        // тетромино достигло правого края стакана?
        if (xy[1] + horizontal > 10) {
          return false;
        }
        // тетромино достигло верхнего края стакана?
        if (xy[0] + k1 < 0) {
          return true;
        }
        // тетромино достигло дна стакана?
        if (xy[0] + k1 >= 20) {
          return false;
        }
        // если n (число в массиве тетромино) равно 1
        if (n) {
          // тетромино достигло другое тетромино?
          if (matrix.get(xy[0] + k1).get(xy[1] + k2)) {
            return false;
          }
          return true;
        }
        return true;
      })
    ));
  },
  
  // очистить линии?
  isClear(matrix) {
    const clearLines = [];
    matrix.forEach((m, k) => {
      if (m.every(n => !!n)) {
        clearLines.push(k);
      }
    });
    if (clearLines.length === 0) {
      return false;
    }
    return clearLines;
  },
  
  // стакан переполнен?
  isOver(matrix) {
    return matrix.get(0).some(n => !!n);
  },
  
  // записать состояние игры в локальное хранилище
  subscribeRecord(store) {
    store.subscribe(() => {
      let data = store.getState();
      if (data.matrix.lock) {
        return;
      }
      data = JSON.stringify(data);
      data = encodeURIComponent(data);
      localStorage.setItem(STORAGE_KEY, data);
    });
  },
};

export const { getNextType, wait, isClear, isOver, subscribeRecord } = unit;
