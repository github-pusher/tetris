import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import StyledButton from './StyledButton';

class Button extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.active !== this.props.active;
  }
  
  render() {
    const {
      active,
      color,
      size,
      top,
      left,
      title,
      arrow,
    } = this.props;
    
    return (
      <StyledButton
        className={classnames([color, size])}
        style={{ top, left }}
      >
        <i
          className={classnames({ active: active })}
          ref={(c) => { this.dom = c; }}
        />
        {
          arrow && <em
            style={{ transform: `${arrow} scale(1,2)` }}
          />
        }
        <span>{title}</span>
      </StyledButton>
    );
  }
}

Button.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  arrow: PropTypes.string,
};

export default Button;
