import styled from 'styled-components';

export default styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 32px;
  height: 32px;
  background-color: #000;
  border-radius: 50%;
  box-shadow: 3px 3px 6px #1b1b1b, -2px -2px 5px #30343a;
  color: #717790c7;
  cursor: pointer;
  outline: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  touch-action: manipulation;
  
  &:active {
    box-shadow: inset 2px 2px 5px #1b1b1b, inset -2px -2px 5px #30343a;
  }
  
  &.active {
    color: #fff;
  }
`;