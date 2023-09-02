import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    user-select: none;
  }

  html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  body {
    font-family: monospace;
    background-color: #ecf0f3;
    color: #000;
    overflow: hidden;
  }
  
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #292d32; 
    }
  }
  
  body.fontLoaded {
    font-family: 'VT323', monospace;
  }
  
  p {
    margin: 0;
    padding: 0;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.2;
  }
  
  .float-left {
    float:left;
  }
  
  .float-right {
    float: right;
  }
  
  .clear-both {
    clear: both;
  }
`

export default GlobalStyles;
