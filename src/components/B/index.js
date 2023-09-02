import styled from 'styled-components';

const B = styled.b`
  display: block;
  width: 20px;
  height: 20px;
  padding: 2px;
  border: 2px solid #97a29c;
  margin: 0 2px 2px 0;
  float: left;
  
  &::after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    background: #97a29c;
    overflow: hidden;
  }
  
  &.fill {
    border-color: #000;
    
    &::after {
      background: #000;
    }
  }
  
  &.clear {
    border-color: #000000cc;
    
    &::after {
      background: #000000cc;
    }
  }
  
  &.lineClear {
    border-color: #8a170e;
    
    &::after {
      background: #8a170e;
    }
  }
  
  &.lineFill {
    border-color: #e72b1c;
    
    &::after {
      background: #e72b1c;
    }
  }
  
  &.turquoise {
    border-color: #007878;
    
    &::after {
      background: #007878;
    }
  }
  
  &.turquoiseClear {
    border-color: #00787890;
    
    &::after {
      background: #00787890;
    }
  }
  
  &.blue {
    border-color: #000078;
    
    &::after {
      background: #000078;
    }
  }
  
  &.blueClear {
    border-color: #00007890;
    
    &::after {
      background: #00007890;
    }
  }
  
  &.orange {
    border-color: #785000;
    
    &::after {
      background: #785000;
    }
  }
  
  &.orangeClear {
    border-color: #78500090;
    
    &::after {
      background: #78500090;
    }
  }
  
  &.yellow {
    border-color: #787800;
    
    &::after {
      background: #787800;
    }
  }
  
  &.yellowClear {
    border-color: #78780090;
    
    &::after {
      background: #78780090;
    }
  }
  
  &.green {
    border-color: #007800;
    
    &::after {
      background: #007800;
    }
  }
  
  &.greenClear {
    border-color: #00780090;
    
    &::after {
      background: #00780090;
    }
  }
  
  &.purple {
    border-color: #500078;
    
    &::after {
      background: #500078;
    }
  }
  
  &.purpleClear {
    border-color: #50007890;
    
    &::after {
      background: #50007890;
    }
  }
  
  &.red {
    border-color: #780000;
    
    &::after {
      background: #780000;
    }
  }
  
  &.redClear {
    border-color: #78000090;
    
    &::after {
      background: #78000090;
    }
  }
  
  &.decor {
    border-color: #2d3748;
    
    &::after {
      background: #2d3748;
    }
  }
`

export default B;
