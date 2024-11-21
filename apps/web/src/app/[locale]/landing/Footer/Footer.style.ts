import { css } from '_panda/css';
import type { SystemStyleObject } from '_panda/types';

export const footer = css({
  display: 'flex',
  flexDir: 'column',
  gap: '120px',
  bg: 'black.black',
  width: '100%',
  color: 'white.white',
  padding: '120px 0',

  _mobile: {
    padding: '80px 16px',
    gap: '60px',
  },
});

export const article = css({
  display: 'flex',
  width: '100%',
  maxWidth: '1120px',
  margin: '0 auto',

  _mobile: {
    flexDir: 'column',
    gap: '24px',
  },
});

export const title = css({
  width: '348px',
  flexShrink: 1,
  textStyle: 'glyph28.bold',
  color: 'white.white',

  _mobile: {
    textStyle: 'glyph18.bold',
  },
});

const defaultContentWrapper: SystemStyleObject = {
  width: '100%',
};

export const teamContentWrapper = css(defaultContentWrapper, {
  display: 'flex',
  gap: '12px',

  _mobile: {
    flexDir: 'column',
    gap: '16px',
  },
});

export const repoContentWrapper = css(defaultContentWrapper, {
  display: 'flex',
  flexDir: 'column',
  gap: '16px',
});

export const repoLi = css({
  display: 'flex',
  gap: '8px',

  _mobile: {
    flexDir: 'column',
    gap: '1px',
  },
});

export const repoLiTitle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '226px',
  textStyle: 'glyph18.bold',

  _mobile: {
    textStyle: 'glyph15.bold',
    gap: '17px',
  },
});

export const repoLiLink = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_75',
  textDecoration: 'underline',

  _mobile: {
    textStyle: 'glyph12.regular',
    marginLeft: '37px',
  },
});
