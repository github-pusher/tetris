import event from '../event';
import { sound } from '../../containers/Keyboard/keyboardSlice';
import { setSound } from '../../containers/Matrix/matrixSlice';

const down = (store) => {
  store.dispatch(sound(true));
  
  if (store.getState().matrix.lock) {
    return;
  }
  
  event.down({
    key: 'd',
    once: true,
    callback: () => {
      if (store.getState().matrix.lock) {
        return;
      }
      
      store.dispatch(setSound(!store.getState().matrix.sound));
    },
  });
};

const up = (store) => {
  store.dispatch(sound(false));
  event.up({
    key: 'd',
  });
};

export default {
  down,
  up,
};
