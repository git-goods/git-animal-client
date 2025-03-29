'use client';

import type { ComponentProps, PropsWithChildren } from 'react';
import { css, cx } from '_panda/css';

import { useRadioContext } from './Root';

interface RadioButtonProps extends ComponentProps<'button'> {
  value: string;
}

const RadioButton = ({ children, className, ...props }: PropsWithChildren<RadioButtonProps>) => {
  const { value, handleChangeValue } = useRadioContext();
  const isSelected = value === props.value;

  return (
    <button
      type="button"
      className={cx(className, buttonStyle, isSelected && 'selected')}
      onClick={() => handleChangeValue(props.value)}
      {...props}
    >
      {children}
    </button>
  );
};

const buttonStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '40px',
  color: 'white.white_25',
  background: 'white.white_10',
  border: '1px solid transparent',
  borderRadius: '6px',
  outline: 'none',
  padding: '8px 16px',
  textStyle: 'glyph16.bold',
  transition: 'all 0.1s ease-in-out',

  '&:focus': {
    borderColor: 'white.white_50',
  },

  '&.selected': {
    bg: 'white.white_50',
    color: 'white',
    borderColor: 'white.white_50',

    '&:focus': {
      borderColor: 'white',
    },
  },
});

export default RadioButton;
