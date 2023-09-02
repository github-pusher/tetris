import styled from 'styled-components';

export default styled.div`
  height: 23px;
  width: 30px;
  position: relative;
  left: 8px;
  display: inline-block;
  --color: #97a29c;

  i {
    display: block;
    width: 8px;
    height: 8px;
    background-color: var(--color);
    margin: 11px 0 11px 2px;
    font-family: Arial, sans-serif;

    &::before {
      content: '';
      position: absolute;
      top: 5px;
      left: -13px;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: transparent var(--color) transparent transparent;
      border-width: 10px 14px 10px 15px;
    }

    &::after {
      position: absolute;
      top: 3px;
      left: 18px;
      bottom: 0;
      content: '\\00D7';
      font-size: 16px;
      color: var(--color);
    }

    &.active {
      --color: #000;
    }
  }
`;
