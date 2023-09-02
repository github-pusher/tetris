import React from 'react';
import PropTypes from 'prop-types';

import StyledNext from './StyledNext';
import B from '../../components/B';
import { TETROMINO } from '../../unit/constants';

const xy = {
  I: [1, 0],
  J: [0, 0],
  L: [0, 0],
  O: [0, 0],
  S: [0, 0],
  T: [0, 0],
  Z: [0, 0],
};

const blankMatrix = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const color = {
  I: 'turquoise',
  J: 'blue',
  L: 'orange',
  O: 'yellow',
  S: 'green',
  T: 'purple',
  Z: 'red',
}

export default class Next extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      block: blankMatrix,
    };
  }
  
  UNSAFE_componentWillMount() {
    this.build(this.props.type);
  }
  
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.build(nextProps.type, nextProps.colorToggle);
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.type !== this.props.type || nextProps.colorToggle !== this.props.colorToggle;
  }
  
  build(nextType, nextColorToggle) {
    const shape = TETROMINO[nextType];
    const block = blankMatrix.map(element => ([...element]));
    
    shape.forEach((m, k1) => {
      m.forEach((n, k2) => {
        if (n) {
          block[k1 + xy[nextType][0]][k2 + xy[nextType][1]] = nextColorToggle ? color[nextType] : 'fill';
        }
      });
    });
    
    this.setState({ block });
  }
  
  render() {
    return (
      <StyledNext>
        {
          this.state.block.map((arr, k1) => (
            <div key={k1}>
              {
                arr.map((e, k2) => (<B
                  className={e}
                  key={k2}
                />))
              }
            </div>
          ))
        }
      </StyledNext>
    );
  }
  
};

Next.propTypes = {
  type: PropTypes.string.isRequired,
};
