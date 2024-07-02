import { css } from '_panda/css';
import { flex, grid } from '_panda/patterns';

export const container = flex({
  paddingTop: '120px',
  flexDirection: 'column',
  gap: '60px',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'black',
});

export const heading = css({
  textStyle: 'glyph82.bold',
  color: 'white',
});

export const infoContainer = grid({
  gap: '120px',
  padding: '40px 70px',
  gridTemplateColumns: 'repeat(3, 1fr)',
  maxWidth: '767px',
  background: 'white_10',
  borderRadius: '16px',
});

export const infoItem = css({
  '& p': {
    _first: {
      textStyle: 'glyph48.bold',
      color: '#FDFAFF',
    },
    _last: {
      textStyle: 'glyph18.bold',
      color: 'white_50',
    },
  },
});

export const buttonWrapper = css({
  paddingTop: '20px',
});
