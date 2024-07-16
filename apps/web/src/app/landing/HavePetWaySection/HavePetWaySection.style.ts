import { css } from '_panda/css';
import { flex } from '_panda/patterns';

export const section = css({
  padding: '120px 0',
  backgroundColor: 'brand.beige',
});

export const heading = css({
  color: 'black.black',
  textStyle: 'glyph48.bold',
  textAlign: 'center',
  marginBottom: '80px',
});

export const wayContainer = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  maxWidth: '1120px',
  gap: '24px',
  margin: 'auto',
});

export const wayItem = flex({
  position: 'relative',
  gap: '12px',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const wayItemHeading = css({
  textStyle: 'glyph32.bold',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  p: '40px 40px 0 40px',

  '& span': {
    textStyle: 'glyph22.regular',
    display: 'block',
    width: '32px',
    height: '32px',
    background: 'black.black',
    color: 'white.white',
    textAlign: 'center',
  },
});

export const wayItemDesc = css({ textStyle: 'glyph18.regular', mt: '16px', px: '40px', color: 'black.black_90' });

export const wayItemImage = css({
  width: '100%',
});
