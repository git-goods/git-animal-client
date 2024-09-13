import { css } from '_panda/css';

export const itemImage = css({
  padding: '0 24px',
});

export const itemContainer = css({
  padding: '40px 40px 60px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  _mobile: {
    gap: '28px',
    padding: '20px 20px 28px 20px',
  },
});

export const itemHgroup = css({
  padding: '0 20px',
  color: '#fff',
  textAlign: 'left',
  '& h2': {
    textStyle: 'glyph32.bold',
    _mobile: {
      textStyle: 'glyph18.bold',
    },
  },
  '& p': {
    marginTop: '8px',
    textStyle: 'glyph18.regular',
    _mobile: {
      textStyle: 'glyph14.regular',
    },
  },
});
