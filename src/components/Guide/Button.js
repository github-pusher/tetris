import styled from 'styled-components';

export default styled.button`
  border: none;
  width: 3.2rem;
  height: 3.2rem;
  background-color: #ecf0f3;
  border-radius: 50%;
  color: #404040;
  box-shadow: 0.8rem 0.8rem 1.4rem #d1d9e6, -0.2rem -0.2rem 1.8rem #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  touch-action: manipulation;

  &:active {
    box-shadow: inset 0.2rem 0.2rem 0.5rem #d1d9e6, inset -0.2rem -0.2rem 0.5rem #fff;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #292d32;
    color: #ccc;
    box-shadow: 0.8rem 0.8rem 1.4rem #1b1b1b, -0.2rem -0.2rem 1.8rem #30343a;
    
    &:active {
      box-shadow: inset 0.2rem 0.2rem 0.5rem #1b1b1b, inset -0.2rem -0.2rem 0.5rem #30343a;
    }
  }
  
  @media screen and (min-width: 992px) {
    width: 4.8rem;
    height: 4.8rem;
  }
`;
