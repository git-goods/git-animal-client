import { css } from '_panda/css';
import { flex } from '_panda/patterns';

export const section = flex({
  paddingTop: '120px',
  paddingBottom: '120px',
  textAlign: 'center',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflowX: 'hidden',

  _mobile: {
    padding: '80px 12px',
  },

  '& .mobile': {
    display: 'none',
    _mobile: {
      display: 'block',
    },
  },

  '& .desktop': {
    display: 'block',
    _mobile: {
      display: 'none',
    },
  },
});

export const heading = css({
  textStyle: 'glyph82.bold',
  maxWidth: '800px',
  color: 'white',

  _mobile: {
    textStyle: 'glyph40.bold',
  },
});

export const desc = css({
  textStyle: 'glyph24.regular',
  maxWidth: '600px',
  color: 'white',
  marginTop: '16px',
  marginBottom: '40px',
  _mobile: {
    textStyle: 'glyph16.regular',
    marginBottom: '20px',
    marginTop: '20px',
  },
});

export const bg = css({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  zIndex: 'hide',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(151deg, #016EDB 11.25%, #16B7CD 61.95%, #5CCA69 94.01%)',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export const sliderContainer = css({
  marginTop: '80px',
});
