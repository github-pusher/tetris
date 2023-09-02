import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledNumber from './StyledNumber';

const render = (data, classname) => (
  <StyledNumber className={classname}>
    {
      data.map((e, k) => (
        <span
          className={classnames({
            blank: e === 'n',
            fill: e !== 'n',
          })}
          key={k}
        >
          {e === 'n' ? 0 : e}
        </span>
      ))
    }
  </StyledNumber>
);

export default class Number extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.number !== this.props.number;
  }
  
  render() {
    const num = `${this.props.number}`.split('');
    
    for (let i = 0, len = this.props.length - num.length; i < len; i++) {
      num.unshift('n');
    }
    
    return(render(num, this.props.className));
  }
};

Number.defaultProps = {
  length: 6,
};

Number.propTypes = {
  number: PropTypes.number.isRequired,
  length: PropTypes.number,
  classname: PropTypes.string,
};
