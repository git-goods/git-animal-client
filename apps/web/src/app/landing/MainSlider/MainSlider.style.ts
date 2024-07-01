import { css } from '_panda/css';

export const container = css({
  width: 'fit-content',
  height: 'fit-content',
  margin: 'auto',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.10)',
});

export const tab = css({
  display: 'flex',
  gap: '0',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '40px',

  '& button': {
    padding: '4px 10px',
    color: '#fff',
    textStyle: 'glyph18.regular',
    opacity: '0.5',

    '&.active': {
      opacity: '1',
      textStyle: 'glyph18.bold',
    },
  },

  _mobile: {
    paddingTop: '26px',
    '& button': {
      padding: '2px 8px',
      textStyle: 'glyph16.regular',
      '&.active': {
        textStyle: 'glyph16.bold',
      },
    },
  },
});

export const sliderContainer = css({
  position: 'relative',
  width: '1120px',
  height: '800px',
  _mobile: {
    width: 'calc(100vw - 40px)',
    height: 'auto',
  },
});

export const sliderItem = css({
  width: 'fit-content',
  height: 'fit-content',
});

export const sliderItemImage = css({
  padding: '0 24px',
});

export const sliderItemInner = css({
  padding: '40px 40px 60px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  _mobile: {
    gap: '28px',
    padding: '20px 20px 28px 20px',
  },
});

export const sliderItemHgroup = css({
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
