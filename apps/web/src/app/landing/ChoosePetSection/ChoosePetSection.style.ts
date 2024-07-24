import { css } from '_panda/css';
import { center } from '_panda/patterns';

export const section = center({
  position: 'relative',
  p: '120px 0',
  overflow: 'hidden',
  flexDirection: 'column',
  gap: '60px',

  _mobile: {
    p: '80px 16px',
    gap: '20px',
  },
});

export const bg = css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: -1,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export const heading = css({
  textStyle: 'glyph82.bold',
  color: 'white',
  textAlign: 'center',
  maxWidth: '840px',

  _mobile: {
    textStyle: 'glyph40.bold',
  },
});
