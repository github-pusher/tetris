import event from '../event';
import states from '../states';
import { reset } from '../../containers/Keyboard/keyboardSlice';

const down = (store) => {
  store.dispatch(reset(true));

  if (store.getState().matrix.lock) {
    return;
  }

  if (store.getState().matrix.current !== null) {
    event.down({
      key: 'a',
      once: true,
      callback: () => {
        states.startOver();
      },
    });
  } else {
    event.down({
      key: 'a',
      once: true,
      callback: () => {
        if (store.getState().matrix.lock) {
          return;
        }
        states.start();
      },
    });
  }
};

const up = (store) => {
  store.dispatch(reset(false));
  event.up({
    key: 'a',
  });
};

export default {
  down,
  up,
};
