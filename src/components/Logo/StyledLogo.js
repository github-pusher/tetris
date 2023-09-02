import styled from 'styled-components';

export default styled.div`
  width: 100%;
  display: none;
  position: absolute;
  right: auto;
  bottom: 2%;
  
  @media screen and (min-width: 1200px) {
    left: 120%;
    display: block;
  }
  
  @media screen and (min-width: 1400px) {
    left: 130%;
  }
`;
