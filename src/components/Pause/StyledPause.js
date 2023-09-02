import styled from 'styled-components';

export default styled.i`
  position: relative;
  --background-color: #97a29c;
  display: inline-block;
  width: 12px;
  height: 16px;

  &::before {
    content: '';
    width: 4px;
    height: 16px;
    background-color: var(--background-color);
    position: absolute;
    left: 0;
  }

  &::after {
    content: '';
    width: 4px;
    height: 16px;
    background-color: var(--background-color);
    position: absolute;
    left: 8px;
  }

  &.active {
    --background-color: #000;
  }
`;
