import { css, cx } from '_panda/css';
import { ComponentProps } from 'react';

interface TextFieldProps extends ComponentProps<'input'> {
  error?: string;
}

export const TextField = ({ error, ...props }: TextFieldProps) => {
  return (
    <div>
      <input type="text" {...props} className={cx(textFieldStyle, props.className)} />
      {error && <p className={errorStyle}>{error}</p>}
    </div>
  );
};

const textFieldStyle = css({
  height: '55px',
  padding: '14px 20px',
  alignItems: 'flex-start',
  gap: '8px',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'white.white_25',
  color: 'white',
  textStyle: 'glyph16.regular',
  width: '100%',
  _placeholder: {
    color: 'white.white_50',
  },
});

const errorStyle = css({
  textStyle: 'glyph14.regular',
  color: 'brand.coral',
  mt: '6px',
});
