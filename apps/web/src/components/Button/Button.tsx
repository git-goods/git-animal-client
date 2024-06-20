import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 42px;
  border-radius: 6px;
  border: 1px solid #000;
  background-color: #fcfd9c;

  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px -3px 0px 0px #c4c382 inset,
    0px 3px 0px 0px #fdfed2 inset;
  color: #000;

  /* glyph16 regular */
  font-family: 'Product Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.3px;

  &:disabled {
    background: #cccccc;
    box-shadow:
      0px -3px 0px 0px #a3a3a3 inset,
      0px 3px 0px 0px #dbdbdb inset,
      0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

export default Button;
