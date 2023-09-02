import { List } from 'immutable';

const TETROMINO = {
  I: [
    [1, 1, 1, 1]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ],
}

const ORIGIN = {
  I: [[1, -1], [-1, 1]],
  J: [[0, 0]],
  L: [[0, 0]],
  O: [[0, 0]],
  S: [[0, 0]],
  T: [[0, 0], [-1, 0], [1, -1], [0, 1]],
  Z: [[0, 0]],
}

const TETROMINO_TYPE = Object.keys(TETROMINO); // ['I', 'J', 'L', 'O', 'S', 'T', 'Z']

const BLANK_LINE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const FILL_LINE = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const COLOR_FILL_LINE = ['lineClear', 'lineClear', 'lineClear', 'lineClear', 'lineClear', 'lineClear', 'lineClear',
  'lineClear', 'lineClear', 'lineClear'];

const blankMatrix = (() => {       // [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const matrix = [];               // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                   // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (let i = 0; i < 20; i++) {   // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    matrix.push(List(BLANK_LINE))  // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }                                // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                   // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  return matrix;                   // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
})();                              // ...] (20)

const EACH_LINES = 20; // ?

// интервалы падения тетромино в миллисекундах
const SPEEDS = [800, 650, 500, 370, 250, 160]; // 0.8c 0.65сек 0.5с 0.37с 0.25с 0.16с

// время перемещения тетромино влево и вправо в миллисекундах
const DELAYS = [50, 60, 70, 80, 90, 100]; // 0.05c 0.06сек 0.07с 0.08с 0.09с 0.1с

const POINTS = [100, 300, 700, 1500]; // 1 убранная линия - 100 очков, 2 - 300 очков, 3 - 700 очков, 4 - 1500 очков

const MAX_POINTS = 999999; // максимально возможное количество очков

const STORAGE_KEY = 'TETRIS';

const gameRecord = (() => {
  let data = localStorage.getItem(STORAGE_KEY);
  
  if (!data) {
    return false;
  }
  
  try {
    data = decodeURIComponent(data);
    data = JSON.parse(data);
  } catch (error) {
    if (window.console) {
      window.console.error('JSON read error:', error);
    }
    return false;
  }
  
  return data;
})();

export {
  TETROMINO,
  ORIGIN,
  TETROMINO_TYPE,
  BLANK_LINE,
  FILL_LINE,
  COLOR_FILL_LINE,
  blankMatrix,
  EACH_LINES,
  SPEEDS,
  DELAYS,
  POINTS,
  MAX_POINTS,
  STORAGE_KEY,
  gameRecord,
}
