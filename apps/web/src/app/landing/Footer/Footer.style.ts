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
});

export const article = css({
  display: 'flex',
  width: '100%',
  maxWidth: '1120px',
  margin: '0 auto',
});

export const title = css({
  width: '348px',
  flexShrink: 1,
  textStyle: 'glyph28.bold',
  color: 'white.white',
});

const defaultContentWrapper: SystemStyleObject = {
  width: '100%',
};

export const teamContentWrapper = css(defaultContentWrapper, {
  display: 'flex',
  gap: 12,
});

export const repoContentWrapper = css(defaultContentWrapper, {
  display: 'flex',
  flexDir: 'column',
  gap: '16px',
});

export const repoLi = css({
  display: 'flex',
  gap: 8,
});

export const repoLiTitle = css({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: 226,
  textStyle: 'glyph18.bold',
});

export const repoLiLink = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_75',
  textDecoration: 'underline',
});
