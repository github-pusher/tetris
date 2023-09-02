import event from '../event';
import states from '../states';
import { pause } from '../../containers/Keyboard/keyboardSlice';

const down = (store) => {
  store.dispatch(pause(true));
  
  event.down({
    key: 's',
    once: true,
    callback: () => {
      const state = store.getState();
      
      if (state.matrix.lock) {
        return;
      }
      
      const current = state.matrix.current;
      const isPause = state.matrix.pause;
      
      if (current !== null) {
        states.pause(!isPause)
      } else {
        states.start();
      }
    },
  });
};

const up = (store) => {
  store.dispatch(pause(false));
  event.up({
    key: 's',
  });
};

export default {
  down,
  up,
};
