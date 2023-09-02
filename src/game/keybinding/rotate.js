import { wait } from '../../unit';
import event from '../event';
import { rotate } from '../../containers/Keyboard/keyboardSlice';
import { moveBlock, setStartLines } from '../../containers/Matrix/matrixSlice';
import states from '../states';
import { audio } from '../audio';

const down = (store) => {
  store.dispatch(rotate(true));
  
  if (store.getState().matrix.current !== null) {
    event.down({
      key: 'rotate',
      once: true,
      callback: () => {
        const state = store.getState();
        
        if (state.matrix.lock) {
          return;
        }
        
        if (audio.rotate) {
          audio.rotate();
        }
        
        if (state.matrix.pause) {
          states.pause(false);
        }
        
        const current = state.matrix.current;
        
        if (current === null) {
          return;
        }
        
        const next = current.rotate();
        
        if (wait(next, state.matrix.value)) {
          store.dispatch(moveBlock(next));
        }
      },
    });
  } else {
    event.down({
      key: 'rotate',
      begin: 200,
      interval: 100,
      callback: () => {
        if (store.getState().matrix.lock) {
          return;
        }
        
        if (audio.rotate) {
          audio.rotate();
        }
        
        const state = store.getState();
        const current = state.matrix.current;
        
        if (current) {
          return;
        }
        
        let startLines = state.matrix.startLines;
        startLines = startLines + 1 > 10 ? 0 : startLines + 1;
        store.dispatch(setStartLines(startLines));
      },
    });
  }
};

const up = (store) => {
  store.dispatch(rotate(false));
  event.up({
    key: 'rotate',
  });
};

export default {
  down,
  up,
};
