import type { ChangeEvent, ComponentProps } from 'react';
import { useState } from 'react';
import { css, cx } from '_panda/css';

interface TextAreaProps extends ComponentProps<'textarea'> {
  error?: boolean;
}

function TextArea({ maxLength = 300, ...props }: TextAreaProps) {
  const [inputLen, setInputLen] = useState(String(props.value ?? '')?.length || 0);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputLen(e.target.value.length);
    props?.onChange?.(e);
  };

  return (
    <div className={containerStyle}>
      <textarea
        {...props}
        className={cx(props.className, textAreaStyle)}
        onChange={onChange}
        maxLength={maxLength}
        style={{
          border: props.error ? '1px solid #FF6B56' : 'none',
        }}
      />
      <div
        className={textLenStyle}
        style={{
          color: props.error ? '#FF6B56' : 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <strong>{inputLen}</strong>
        <span> / {maxLength}</span>
      </div>
    </div>
  );
}

export default TextArea;

const textAreaStyle = css({
  background: 'transparent',
  border: 'none',
  color: '#000000bf',
  padding: '16px 20px',
  fontFamily: 'Product Sans',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '150%',
  letterSpacing: '-0.3px',
  borderRadius: '8px',
  outline: 'none',
  width: '100%',
  resize: 'none',
  '&::placeholder': {
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Product Sans',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
    letterSpacing: '-0.3px',
  },
});

const textLenStyle = css({
  position: 'absolute',
  bottom: '8px',
  color: 'rgba(0, 0, 0, 0.5)',
  right: '20px',
  fontFamily: 'Product Sans',
  fontSize: '12px',
  fontWeight: 400,
  width: 'fit-content',
  '& strong': {
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.75)',
  },
});
const containerStyle = css({
  position: 'relative',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  // padding: '16px 20px 26px',
  '&:focus-within': {
    border: '1px solid #00894d',
    '& strong': {
      color: '#00894d',
    },
  },
});
