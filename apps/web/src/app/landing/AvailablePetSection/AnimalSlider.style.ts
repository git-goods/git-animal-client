import { css } from '_panda/css';
import { grid } from '_panda/patterns';

export const container = css({
  width: '1120px',
  height: '1024px',

  _mobile: {
    width: 'calc(100vw - 40px)',
  },
});

export const cardContainer = grid({
  gap: 20,
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  width: '1120px',
  height: '1024px',
  padding: '0 1px',
});
