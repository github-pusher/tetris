import { wait } from '../../unit';
import event from '../event';
import { right } from '../../containers/Keyboard/keyboardSlice'
import { setStartSpeed, moveBlock } from '../../containers/Matrix/matrixSlice';
import states from '../states';
import { SPEEDS, DELAYS } from '../../unit/constants';
import { audio } from '../audio';

const down = (store) => {
  store.dispatch(right(true));
  event.down({
    key: 'right',
    begin: 200,
    interval: 100,
    callback: () => {
      const state = store.getState();
      
      if (state.matrix.lock) {
        return;
      }
      
      if (audio.move) {
        audio.move();
      }
      
      const current = state.matrix.current;
      
      if (current !== null) {
        if (state.matrix.pause) {
          states.pause(false);
        }
        
        const next = current.right();
        const delay = DELAYS[state.matrix.speedRun - 1];
        let timeStamp;
        
        if (wait(next, state.matrix.value)) {
          next.timeStamp += parseInt(delay, 10);
          store.dispatch(moveBlock(next));
          timeStamp = next.timeStamp;
        } else {
          current.timeStamp += parseInt(parseInt(delay, 10) / 1.5, 10);
          store.dispatch(moveBlock(current));
          timeStamp = current.timeStamp;
        }
        
        const remain = SPEEDS[state.matrix.speedRun - 1] - (Date.now() - timeStamp);
        states.auto(remain);
      } else {
        let speed = state.matrix.speedStart;
        speed = speed + 1 > 6 ? 1 : speed + 1;
        store.dispatch(setStartSpeed(speed));
      }
    },
  });
};

const up = (store) => {
  store.dispatch(right(false));
  event.up({
    key: 'right',
  });
};

export default {
  down,
  up,
};
