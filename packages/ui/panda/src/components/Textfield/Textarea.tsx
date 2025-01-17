import { cx, css } from '_panda/css';
import { ComponentProps } from 'react';

export const TextArea = (props: ComponentProps<'textarea'>) => {
  return <textarea {...props} className={cx(textAreaStyle, props.className)} />;
};

const textAreaStyle = css({
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'white.white_25',
  width: '100%',
  minHeight: '102px',
  padding: '16px 12px 8px 20px',
  flexShrink: 0,
  color: 'white',
  resize: 'none',
  _placeholder: {
    color: 'white.white_50',
  },
});
