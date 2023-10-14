import styled from 'styled-components';

import NormalNumber from '../../components/Number';

const Number = styled(NormalNumber)`
  position: absolute;
  top: 265px;
  left: 75px;
  float: none;
  font-size: 40px;
  
  > span {
    color: #000!important;
  }
`;

export default Number;
