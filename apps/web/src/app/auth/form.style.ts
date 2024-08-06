import { css } from '_panda/css';
import { center } from '_panda/patterns';

export const container = center({
  bg: 'brand.green',
  minH: '100vh',
});

export const form = center({
  width: '90vw',
  height: '90vh',
  maxH: '400px',
  maxW: '400px',
  flexDirection: 'column',
  gap: '24px',
  borderRadius: '8px',
});

export const heading = css({
  textStyle: 'glyph32.bold',
});
