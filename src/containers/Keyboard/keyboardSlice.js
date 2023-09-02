import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  'key_drop': false,
  'key_reset': false,
  'key_pause': false,
  'key_left': false,
  'key_right': false,
  'key_down': false,
  'key_rotate': false,
  'key_sound': false,
};

export const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    drop: (state, action) => {
      state.key_drop = action.payload;
    },
    reset: (state, action) => {
      state.key_reset = action.payload;
    },
    pause: (state, action) => {
      state.key_pause = action.payload;
    },
    left: (state, action) => {
      state.key_left = action.payload;
    },
    right: (state, action) => {
      state.key_right = action.payload;
    },
    down: (state, action) => {
      state.key_down = action.payload;
    },
    rotate: (state, action) => {
      state.key_rotate = action.payload;
    },
    sound: (state, action) => {
      state.key_sound = action.payload;
    },
  },
});

export const { drop, reset, pause, left, right, down, rotate, sound } = keyboardSlice.actions;

export default keyboardSlice.reducer;
