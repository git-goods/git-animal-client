import { css, cx } from '_panda/css';
import { ComponentProps } from 'react';

export const TextField = (props: ComponentProps<'input'>) => {
  return <input type="text" {...props} className={cx(textFieldStyle, props.className)} />;
};

const textFieldStyle = css({
  height: '55px',
  padding: '14px 20px',
  alignItems: 'flex-start',
  gap: '8px',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'white.white_25',
  color: 'white.white_50',
  textStyle: 'glyph16.regular',
  width: '100%',
});
