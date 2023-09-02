import styled from 'styled-components';

import NormalNumber from '../../components/Number';

const Number = styled(NormalNumber)`
  float: none;
  font-size: 40px;
  
  > span {
    color: #000!important;
  }
`;

export default Number;
