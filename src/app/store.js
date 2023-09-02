import { configureStore } from '@reduxjs/toolkit';

import matrixReducer from '../containers/Matrix/matrixSlice';
import keyboardReducer from '../containers/Keyboard/keyboardSlice';
import colorToggleReducer from '../containers/ColorToggle/colorToggleSlice';

export const store = configureStore({
  reducer: {
    matrix: matrixReducer,
    keyboard: keyboardReducer,
    colorToggle: colorToggleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
