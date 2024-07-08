import { css } from '_panda/css';

export const wrapperCss = css({
  width: '25%',
  display: 'flex',
  flexDir: 'column',
});

export const imageCss = css({
  marginBottom: 8,
});

export const nicknameWrapperCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  marginBottom: 4,

  '& span': {
    textStyle: 'glyph18.bold',
    color: 'white.white_90',
  },
});

export const roleCss = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_75',
});
