import React, { useState } from 'react';
import classnames from 'classnames';
import { FaKeyboard } from 'react-icons/fa';

import StyledGuide from './StyledGuide';
import Button from './Button';
import Container from './Container';
import Img from '../../components/Img';
import Keybinding from './keybinding.png';

function Guide() {
  const [visible, setVisible] = useState(false);
  
  function handleClick() {
    setVisible(!visible);
  }
  
  const iconStyle = {
    pointerEvents: 'none',
  };
  
  return (
    <>
      <StyledGuide>
        <Button onClick={handleClick}>
          <FaKeyboard style={iconStyle} size={40} />
        </Button>
      </StyledGuide>
      <Container className={classnames({visible: visible})}>
        <Img src={Keybinding} alt="guide" />
      </Container>
    </>
  );
}

export default Guide;
