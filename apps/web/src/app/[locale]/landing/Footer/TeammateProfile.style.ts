import { css } from '_panda/css';

export const wrapperCss = css({
  width: '25%',
  display: 'flex',
  flexDir: 'column',

  _mobile: {
    width: '100%',
    flexDir: 'row',
    gap: '5px',
  },
});

export const imageCss = css({
  marginBottom: '8px',

  _mobile: {
    width: '32px',
    height: '24px',
    marginBottom: '0px',
    objectFit: 'contain',
    objectPosition: 'left 50%',
  },
});

export const textWrapperCss = css({
  display: 'flex',
  flexDir: 'column',
});

export const nicknameWrapperCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  marginBottom: '4px',

  '& span': {
    textStyle: 'glyph18.bold',
    color: 'white.white_90',
  },

  _mobile: {
    marginBottom: '1px',
    '& span': {
      textStyle: 'glyph15.bold',
      fontWeight: 'bold',
    },
  },
});

export const roleCss = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_75',

  _mobile: {
    textStyle: 'glyph12.regular',
  },
});
