import styled from 'styled-components';

export default styled.div`
  position: absolute;
  text-align: center;
  color: #fff;
  white-space: nowrap;
  line-height: 1.6;
  
  i {
    display: block;
    position: relative;
    border-radius: 50%;
  }
  
  &.yellow i {
    background: #edd308;
    box-shadow: inset 0 5px 10px #fae96a, inset 0 -5px 10px #948304;
    
    &.active {
      box-shadow: inset 0 5px 10px #948304, inset 0 -5px 10px #fae96a;
    }
  }
  
  &.red i {
    background: #e72b1c;
    box-shadow: inset 0 5px 10px #f07d74, inset 0 -5px 10px #8a170e;
    
    &.active {
      box-shadow: inset 0 5px 10px #8a170e, inset 0 -5px 10px #f07d74;
    }
  }
  
  &.green i {
    background: #1abc9c;
    box-shadow: inset 0 5px 10px #78ecd5, inset 0 -5px 10px #117964;
    
    &.active {
      box-shadow: inset 0 5px 10px #117964, inset 0 -5px 10px #78ecd5;
    }
  }
  
  &.big i {
    width: 120px;
    height: 120px;
  }
  
  &.medium i {
    width: 80px;
    height: 80px;
  }
  
  &.small i {
    width: 44px;
    height: 44px;
  }
  
  em {
    display: block;
    width: 0;
    height: 0;
    border: 6px solid;
    border-color: transparent transparent #f6f1e5;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -8px 0 0 -6px;
  }
  
  span {
    font-family: Ubuntu, sans-serif;
  }

  &.small span {
    font-size: 12px;
  }

  &.medium span {
    font-size: 14px;
  }

  &.big span {
    font-size: 16px;
  }
`;
