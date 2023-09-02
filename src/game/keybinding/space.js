import { wait } from '../../unit/';
import { drop } from '../../containers/Keyboard/keyboardSlice';
import { moveBlock } from '../../containers/Matrix/matrixSlice';
import event from '../event';
import states from '../states';
import { audio } from '../audio';

const down = (store) => {
  store.dispatch(drop(true));
  event.down({
    key: 'space',
    once: true,
    callback: () => {
      const state = store.getState();

      if (state.matrix.lock ) {
        return;
      }

      const current = state.matrix.current;

      if (current !== null) {
        if (state.matrix.pause) {
          states.pause(false);
        }
        
        if (audio.fall) {
          audio.fall();
        }
        
        let index = 0;
        let bottom = current.fall(index);
        
        while (wait(bottom, state.matrix.value)) {
          bottom = current.fall(index);
          index++;
        }
        
        let matrix = state.matrix.value;
        bottom = current.fall(index - 2);
        store.dispatch(moveBlock(bottom));
        const shape = bottom.shape;
        const xy = bottom.xy;
        const colorToggle = state.colorToggle.value;
        const color = bottom.color;
        
        shape.forEach((m, k1) => (
          m.forEach((n, k2) => {
            if (n && xy[0] + k1 >= 0) {
              let line = matrix.get(xy[0] + k1);
              line = line.set(xy[1] + k2, colorToggle ? color : 1);
              matrix = matrix.set(xy[0] + k1, line);
            }
          })
        ));
        
        states.nextAround(matrix);
      } else {
        states.start();
      }
    },
  });
};

const up = (store) => {
  store.dispatch(drop(false));
  event.up({
    key: 'space',
  });
};

export default {
  down,
  up,
};
