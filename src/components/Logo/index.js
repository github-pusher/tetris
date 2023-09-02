import React from 'react';

import StyledLogo from './StyledLogo';
import A from './A';

function Logo () {
  return (
    <StyledLogo>
      <A target="_blank" href="https://linuxmachine.ru/">
        Made with ❤ by <span style={{ fontFamily: 'Montserrat', fontSize: '20px' }}>LINUXMACHINE</span>
      </A>
    </StyledLogo>
  );
}

export default Logo;
