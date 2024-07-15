import { css } from '_panda/css';

export const container = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#fff',
  gap: '24px',

  '& h1': {
    textStyle: 'glyph24.bold',
  },
});
