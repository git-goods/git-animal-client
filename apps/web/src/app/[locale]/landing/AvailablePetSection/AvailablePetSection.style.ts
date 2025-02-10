import { css } from '_panda/css';
import { flex } from '_panda/patterns';

export const container = flex({
  padding: '120px 0',
  flexDirection: 'column',
  gap: '60px',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  background: '#171717',

  _mobile: {
    padding: '80px 0',
    gap: '40px',
  },
});

export const content = flex({
  position: 'relative',
  zIndex: 'floating',
  flexDirection: 'column',
  gap: '60px',
  alignItems: 'center',
  justifyContent: 'center',

  _mobile: {
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

export const infoContainer = flex({
  gap: '60px',
  padding: '40px 52px',
  flexDirection: 'row',
  justifyContent: 'space-between',
  maxWidth: '766px',
  w: '100%',
  background: 'white_10',
  borderRadius: '16px',

  _mobile: {
    flexDir: 'column',
    maxWidth: 'calc(100% - 40px)',
    gap: '12px',
    padding: '24px',
  },
});

export const infoItem = css({
  width: 'fit-content',

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

const bgPicture = {
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 0,
};

export const bgPictureTop = css(bgPicture, { top: 0 });

export const bgPictureBottom = css(bgPicture, { bottom: 0 });
