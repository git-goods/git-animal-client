'use client';

import type { ComponentProps, PropsWithChildren } from 'react';
import React from 'react';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';

interface QuizRadioButtonProps {
  selected?: boolean;
  onClick?: () => void;
}

const QuizRadioButton = ({ selected, onClick, children }: PropsWithChildren<QuizRadioButtonProps>) => {
  return (
    <button type="button" className={cx(radioButtonStyle, selected && 'selected')} onClick={onClick}>
      {children}
    </button>
  );
};

const radioButtonStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '40px',
  color: 'white.white_25',
  background: 'white.white_10',
  border: '1px solid',
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

const QuizRadioGroup = ({ children, ...props }: PropsWithChildren<ComponentProps<typeof Flex>>) => {
  return (
    <Flex gap="6px" width="100%" {...props}>
      {children}
    </Flex>
  );
};

const QuizRadioBase = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const QuizRadio = Object.assign(QuizRadioBase, {
  Group: QuizRadioGroup,
  Button: QuizRadioButton,
});

export default QuizRadio;
