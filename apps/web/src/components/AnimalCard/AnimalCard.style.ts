import { css } from '_panda/css';
import { flex } from '_panda/patterns';

export const container = css({
  position: 'relative',
  height: '100%',
});

export const bgImage = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
});

export const thumbnailImage = css({
  position: 'absolute',
  top: '16px',
  left: '16px',
  right: '16px',

  zIndex: 1,
});

export const infoWrapper = flex({
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  right: '20px',
  justifyContent: 'space-between',
  gap: '8px',
});

export const typeText = css({
  textStyle: 'glyph24.bold',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  lineHeight: '40px',
});

export const ratingText = css({
  textStyle: 'glyph22.regular',
  lineHeight: '40px',
});
