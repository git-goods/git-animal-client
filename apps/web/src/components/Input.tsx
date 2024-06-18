import type { ComponentProps } from 'react';
import styled from 'styled-components';

interface InputProps extends ComponentProps<'input'> {}

function Input(props: InputProps) {
  return <InputStyled {...props} />;
}

export default Input;

const InputStyled = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: transparent;

  color: rgba(0, 0, 0, 0.75);
  padding: 14px 14px 13px 20px;

  /* glyph16 regular */
  font-family: 'Product Sans';
  font-size: 16px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.3px;

  border-radius: 8px;
  outline: none;
  width: 100%;

  &:focus {
    border: 1px solid #00894d;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    /* glyph16 regular */
    font-family: 'Product Sans';
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.3px;
  }
`;
