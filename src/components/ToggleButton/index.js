import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IoMdColorFill } from 'react-icons/io';

import Button from './Button';

function ToggleButton(props) {
  const iconStyle = {
    pointerEvents: 'none',
  }
  
  return (
    <Button className={classnames({ active: props.toggle })} onClick={props.handleToggle}>
      <IoMdColorFill style={iconStyle} size={20} />
    </Button>
  );
}

ToggleButton.propTypes = {
  handleToggle: PropTypes.func,
};

export default ToggleButton;
