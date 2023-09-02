import { store } from '../app/store';
import keybinding from './keybinding';

const keyboard = {
  32: 'space',
  65: 'a',
  83: 's',
  68: 'd',
  37: 'left',
  39: 'right',
  40: 'down',
  38: 'rotate',
};

let keyDownActive;

const boardKeys = Object.keys(keyboard).map(element => parseInt(element, 10));

const keyDown = (event) => {
  if (event.keyCode === 32) {
    event.preventDefault();
  }
  
  if (event.metaKey === true || boardKeys.indexOf(event.keyCode) === -1) {
    return;
  }
  
  const type = keyboard[event.keyCode];
  
  if (type === keyDownActive) {
    return;
  }
  
  keyDownActive = type;
  
  keybinding[type].down(store);
};

const keyUp = (event) => {
  if (event.metaKey === true || boardKeys.indexOf(event.keyCode) === -1) {
    return;
  }
  
  const type = keyboard[event.keyCode];
  
  if (type === keyDownActive) {
    keyDownActive = '';
  }
  
  keybinding[type].up(store);
};

document.addEventListener('keydown', keyDown, true);
document.addEventListener('keyup', keyUp, true);
