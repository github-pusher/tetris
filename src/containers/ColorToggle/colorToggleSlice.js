import { createSlice } from '@reduxjs/toolkit';

import { gameRecord } from '../../unit/constants';

const initialState = {
  value: gameRecord && gameRecord.colorToggle.value !== undefined ?
    !!gameRecord.colorToggle.value : false,
};

export const colorToggleSlice = createSlice({
  name: 'colorToggle',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = colorToggleSlice.actions;

export default colorToggleSlice.reducer;
