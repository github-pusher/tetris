import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 20px;
  left: -70px;
  width: 44px;
  
  em {
    display: block;
    width: 22px;
    height: 22px;
    overflow: hidden;
    float: left;
  }
  
  p {
    height: 22px;
    clear: both;
  }
  
  &.right {
    left: auto;
    right: -70px;
  }
`
