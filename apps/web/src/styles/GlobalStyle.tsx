'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family:'DNFBitBitv2';
    font-style: normal;
    font-weight: 700;
    src: url('//cdn.df.nexon.com/img/common/font/DNFBitBitv2.otf')format('opentype')
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'DNFBitBitv2';
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 107.8px */
    background-color: #2A7442;
    position: relative;
  }

  button {
    cursor: pointer;
    border: transparent;
    background-color: transparent;  
    font-family: 'DNFBitBitv2';
    line-height: 1.5;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; 
    padding: 0;
  }

  input {
    font-family: 'DNFBitBitv2';

    &::placeholder {
      color: #b5b5b5;
      font-family: 'DNFBitBitv2';
    
    }
  }
 
`;

export default GlobalStyle;
