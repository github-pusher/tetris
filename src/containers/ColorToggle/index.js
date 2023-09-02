import React from 'react';
import PropTypes from 'prop-types';

import {
  setValue
} from './colorToggleSlice';

import { store } from '../../app/store';

import ToggleButton from '../../components/ToggleButton';
import Wrapper from './Wrapper';

function ColorToggle(props) {
  const handleColorToggle = () => {
    store.dispatch(setValue(!props.toggle));
  }
  
  return (
    <Wrapper>
      <ToggleButton
        toggle={props.toggle}
        handleToggle={handleColorToggle}
      />
    </Wrapper>
  );
}

ColorToggle.propTypes = {
  toggle: PropTypes.bool,
}

export default ColorToggle;
