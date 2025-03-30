import type { ChangeEvent, ComponentProps } from 'react';
import { useState } from 'react';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';

import { customScrollStyle } from '@/styles/scrollStyle';

interface QuizTextAreaProps extends ComponentProps<'textarea'> {
  error?: boolean;
}

function QuizTextArea({ maxLength = 1000, ...props }: QuizTextAreaProps) {
  const [inputLen, setInputLen] = useState(String(props.value ?? '')?.length || 0);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputLen(e.target.value.length);
    props?.onChange?.(e);
  };

  return (
    <div className={containerStyle}>
      <textarea
        {...props}
        className={cx(props.className, textAreaStyle, customScrollStyle, props.error && 'error')}
        onChange={onChange}
        maxLength={maxLength}
      />
      <Flex justify="flex-end" align="center">
        <div className={cx(textLenStyle, props.error && 'error')}>
          <strong>{inputLen}</strong>
          <span>/{maxLength}</span>
        </div>
      </Flex>
    </div>
  );
}

export default QuizTextArea;

const textAreaStyle = css({
  background: 'transparent',
  border: 'none',
  color: 'white',
  padding: '16px 12px 2px 20px',
  textStyle: 'glyph14.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  borderRadius: '8px',
  outline: 'none',
  width: '100%',
  height: '160px',
  resize: 'none',

  '&::placeholder': {
    textStyle: 'glyph14.regular',
    fontFamily: 'Product Sans',
    fontWeight: 400,
    color: 'white.white_50',
  },

  '&.error': {
    border: '1px solid #FF6B56',
  },
});

const textLenStyle = css({
  position: 'relative',
  color: 'white.white_50',
  textStyle: 'glyph12.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  padding: '0px 12px 8px 0px',

  '& strong': {
    fontWeight: 400,
    color: 'white.white_50',
  },

  '&.error': {
    color: '#FF6B56',
  },
});

const containerStyle = css({
  position: 'relative',
  border: `1px solid white`,
  borderColor: 'white.white_25',
  borderRadius: '8px',
  transition: 'all 0.1s ease-in-out',
  overflow: 'hidden',

  '&:focus-within': {
    border: '1px solid white',
    borderColor: 'white.white_50',

    '& strong': {
      color: '#00894d',
    },
  },
});
