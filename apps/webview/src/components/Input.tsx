import type { ComponentProps } from 'react';
import { css, cx } from '_panda/css';

interface InputProps extends ComponentProps<'input'> {}

function Input(props: InputProps) {
  return <input {...props} className={cx(inputStyle, props.className)} />;
}

export default Input;

const inputStyle = css({
  border: '1px solid rgba(0, 0, 0, 0.1)',
  background: 'transparent',
  color: 'rgba(0, 0, 0, 0.75)',
  padding: '14px 14px 13px 20px',
  fontFamily: 'Product Sans',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '150%',
  letterSpacing: '-0.3px',
  borderRadius: '8px',
  outline: 'none',
  width: '100%',
  '&:focus': {
    border: '1px solid #00894d',
  },
  '&::placeholder': {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Product Sans',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
    letterSpacing: '-0.3px',
  },
});
