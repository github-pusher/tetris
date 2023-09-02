import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  overflow: hidden;
  
  span {
    display: block;
    width: 160px;
    height: 160px;
    overflow: hidden;
    background: #fff;
    
    &.ml {
      margin-left: 10px;
    }
    
    &.mr {
      margin-right: 10px;
    }
  }
`
