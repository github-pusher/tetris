import { List } from 'immutable';
import { TETROMINO, ORIGIN } from './constants';

class Block {
  constructor(option) {
    this.type = option.type;
    
    if (!option.rotateIndex) {
      this.rotateIndex = 0;
    } else {
      this.rotateIndex = option.rotateIndex;
    }

    if (!option.timeStamp) {
      this.timeStamp = Date.now();
    } else {
      this.timeStamp = option.timeStamp;
    }

    if (!option.shape) {
      this.shape = List(TETROMINO[option.type].map(element => List(element)));
    } else {
      this.shape = option.shape;
    }
    
    if (!option.xy) {
      switch (option.type) {
        case 'I': // I
          this.xy = List([0, 3]);
          break;
        case 'J': // J
          this.xy = List([-1, 4]);
          break;
        case 'L': // L
          this.xy = List([-1, 4]);
          break;
        case 'O': // O
          this.xy = List([-1, 4]);
          break;
        case 'S': // S
          this.xy = List([-1, 4]);
          break;
        case 'T': // T
          this.xy = List([-1, 4]);
          break;
        case 'Z': // Z
          this.xy = List([-1, 4]);
          break;
        default:
          break;
      }
    } else {
      this.xy = List(option.xy);
    }
    
    if (!option.color) {
      switch (option.type) {
        case 'I': // I
          this.color = 'turquoise';
          break;
        case 'J': // J
          this.color = 'blue';
          break;
        case 'L': // L
          this.color = 'orange';
          break;
        case 'O': // O
          this.color = 'yellow';
          break;
        case 'S': // S
          this.color = 'green';
          break;
        case 'T': // T
          this.color = 'purple';
          break;
        case 'Z': // Z
          this.color = 'red';
          break;
        default:
          break;
      }
    } else {
      this.color = option.color;
    }
    
    if (!option.clearColor) {
      switch (option.type) {
        case 'I': // I
          this.clearColor = 'turquoiseClear';
          break;
        case 'J': // J
          this.clearColor = 'blueClear';
          break;
        case 'L': // L
          this.clearColor = 'orangeClear';
          break;
        case 'O': // O
          this.clearColor = 'yellowClear';
          break;
        case 'S': // S
          this.clearColor = 'greenClear';
          break;
        case 'T': // T
          this.clearColor = 'purpleClear';
          break;
        case 'Z': // Z
          this.clearColor = 'redClear';
          break;
        default:
          break;
      }
    } else {
      this.clearColor = option.clearColor;
    }
  }
  
  fall(n = 1) {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy.get(0) + n, this.xy.get(1)],
      rotateIndex: this.rotateIndex,
      timeStamp: Date.now(),
      color: this.color,
      clearColor: this.clearColor,
    };
  }
  
  left() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy.get(0), this.xy.get(1) - 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp,
    };
  }
  
  right() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy.get(0), this.xy.get(1) + 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp,
    };
  }
  
  rotate() {
    const shape = this.shape;
    let result = List([]);
    
    shape.forEach(m => m.forEach((n, k) => {
      const index = m.size - k - 1;
      if (result.get(index) === undefined) {
        result = result.set(index, List([]));
      }
      const tempK = result.get(index).push(n);
      result = result.set(index, tempK);
    }));
    
    const nextXy = [
      this.xy.get(0) - ORIGIN[this.type][this.rotateIndex][0],
      this.xy.get(1) - ORIGIN[this.type][this.rotateIndex][1],
    ];
    
    const nextRotateIndex = this.rotateIndex + 1 >= ORIGIN[this.type].length ?
      0 : this.rotateIndex + 1;
    
    return {
      shape: result,
      type: this.type,
      xy: nextXy,
      rotateIndex: nextRotateIndex,
      timeStamp: this.timeStamp,
    };
  }
}

export default Block;
