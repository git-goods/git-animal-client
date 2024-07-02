import { css } from '_panda/css';
import { flex, grid } from '_panda/patterns';

export const container = flex({
  padding: '120px 0',
  flexDirection: 'column',
  gap: '60px',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'black',

  _mobile: {
    padding: '80px 0',
    gap: '40px',
  },
});

export const heading = css({
  textStyle: 'glyph82.bold',
  color: 'white',
  _mobile: {
    textStyle: 'glyph32.bold',
  },
});

export const infoContainer = grid({
  gap: '120px',
  padding: '40px 70px',
  gridTemplateColumns: 'repeat(3, 1fr)',
  maxWidth: '767px',
  background: 'white_10',
  borderRadius: '16px',

  _mobile: {
    maxWidth: 'calc(100% - 40px)',
    gap: '44px',
    padding: '24px',
  },
});

export const infoItem = css({
  '& p': {
    _first: {
      textStyle: 'glyph48.bold',
      color: '#FDFAFF',
      _mobile: {
        textStyle: 'glyph24.bold',
      },
    },
    _last: {
      textStyle: 'glyph18.bold',
      color: 'white_50',
      _mobile: {
        textStyle: 'glyph14.regular',
      },
    },
  },
});

export const buttonWrapper = css({
  paddingTop: '20px',

  _mobile: {
    paddingTop: 0,
  },
});
