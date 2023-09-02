import React, { useState } from 'react';
import classnames from 'classnames';
import { ImQrcode } from 'react-icons/im';

import StyledQrCode from './StyledQrCode';
import Button from './Button';
import Container from './Container';
import Img from './Img';
import Qrcode from './qrcode.png'

function Logo () {
  const [visible, setVisible] = useState(false);
  
  function handleClick() {
    setVisible(!visible);
  }
  
  const iconStyle = {
    pointerEvents: 'none',
  };
  
  return (
    <>
      <StyledQrCode>
        <Button onClick={handleClick}>
          <ImQrcode style={iconStyle} size={30} />
        </Button>
      </StyledQrCode>
      <Container className={classnames({visible: visible})}>
        <Img src={Qrcode} alt="https://tetris-linuxmachine.vercel.app" />
      </Container>
    </>
  );
}

export default Logo;
