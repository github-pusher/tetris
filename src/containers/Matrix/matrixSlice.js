import { List } from 'immutable';
import { createSlice } from '@reduxjs/toolkit';

import { blankMatrix, gameRecord, TETROMINO_TYPE, MAX_POINTS } from '../../unit/constants';
import { getNextType } from '../../unit';
import Block from '../../unit/block';
import { hasWebAudioAPI } from '../../game/audio';

let startSpeed = gameRecord && !isNaN(parseInt(gameRecord.matrix.speedStart, 10)) ?
  parseInt(gameRecord.matrix.speedStart, 10) : 1;

if (startSpeed < 1 || startSpeed > 6) {
  startSpeed = 1;
}

let runSpeed = gameRecord && !isNaN(parseInt(gameRecord.matrix.speedRun, 10)) ?
  parseInt(gameRecord.matrix.speedRun, 10) : 1;

if (runSpeed < 1 || runSpeed > 6) {
  runSpeed = 1;
}

let startLines = gameRecord && !isNaN(parseInt(gameRecord.matrix.startLines, 10)) ?
  parseInt(gameRecord.matrix.startLines, 10) : 0;

if (startLines < 1 || startLines > 10) {
  startLines = 0;
}

let clearLines = gameRecord && !isNaN(parseInt(gameRecord.matrix.clearLines, 10)) ?
  parseInt(gameRecord.matrix.clearLines, 10) : 0;

if (clearLines < 0) {
  clearLines = 0;
}

const newBlock = (() => {
  if (!gameRecord || !gameRecord.matrix.current) {
    return null;
  }

  const current = gameRecord.matrix.current;
  
  const option = {
    type: current.type,
    rotateIndex: current.rotateIndex,
    shape: List(current.shape.map(element => List(element))),
    xy: current.xy,
    color: current.color,
    clearColor: current.clearColor,
  };
  
  return new Block(option);
})();

let gamePoints = gameRecord && !isNaN(parseInt(gameRecord.matrix.points, 10)) ?
    parseInt(gameRecord.matrix.points, 10) : 0;

if (gamePoints < 0) {
  gamePoints = 0;
} else if (gamePoints > MAX_POINTS) {
  gamePoints = MAX_POINTS;
}

let max_point = gameRecord && !isNaN(parseInt(gameRecord.matrix.max, 10)) ?
  parseInt(gameRecord.matrix.max, 10) : 0;

if (max_point < 0) {
  max_point = 0;
} else if (max_point > MAX_POINTS) {
  max_point = MAX_POINTS;
}

let soundOn = gameRecord && gameRecord.matrix.sound !== undefined ? !!gameRecord.matrix.sound : true;

if (!hasWebAudioAPI.data) {
  soundOn = false;
}

const initialState = {
  speedStart: startSpeed,
  speedRun: runSpeed,
  startLines: startLines,
  clearLines: clearLines,
  value: gameRecord && Array.isArray(gameRecord.matrix.value) ?
    List(gameRecord.matrix.value.map(element => List(element))) : blankMatrix,
  next: gameRecord && TETROMINO_TYPE.indexOf(gameRecord.matrix.next) !== -1 ?
    gameRecord.matrix.next : getNextType(),
  current: newBlock,
  lock: gameRecord && gameRecord.matrix.lock !== undefined ?
    !!gameRecord.matrix.lock : false,
  reset: gameRecord && gameRecord.matrix.reset ?
    !!gameRecord.matrix.reset : false,
  pause: gameRecord && gameRecord.matrix.pause !== undefined ?
    !!gameRecord.matrix.pause : false,
  points: gamePoints,
  max: max_point,
  sound: soundOn,
};

export const matrixSlice = createSlice({
  name: 'matrix',
  initialState,
  reducers: {
    setStartSpeed: (state, action) => {
      state.speedStart = action.payload;
    },
    setRunSpeed: (state, action) => {
      state.speedRun = action.payload;
    },
    setStartLines: (state, action) => {
      state.startLines = action.payload;
    },
    setClearLines: (state, action) => {
      state.clearLines = action.payload;
    },
    setMatrix: (state, action) => {
      state.value = action.payload;
    },
    nextBlock: (state, action) => {
      state.next = getNextType();
    },
    currentBlock: (state, action) => {
      state.current = action.payload;
    },
    setLock: (state, action) => {
      state.lock = action.payload;
    },
    setReset: (state, action) => {
      state.reset = action.payload;
    },
    setPause: (state, action) => {
      state.pause = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload > MAX_POINTS ? MAX_POINTS : action.payload;
    },
    setMax: (state, action) => {
      state.max = action.payload > MAX_POINTS ? MAX_POINTS : action.payload;
    },
    setSound: (state, action) => {
      state.sound = action.payload;
    },
  },
});

export const {
  setStartSpeed,
  setRunSpeed,
  setStartLines,
  setClearLines,
  setMatrix,
  nextBlock,
  currentBlock,
  setLock,
  setReset,
  setPause,
  setPoints,
  setMax,
  setSound,
} = matrixSlice.actions;

export const moveBlock = (option) => (dispatch) => {
  const newBlock = option.reset === true ? null : new Block(option);
  dispatch(currentBlock(newBlock));
};

export default matrixSlice.reducer;
