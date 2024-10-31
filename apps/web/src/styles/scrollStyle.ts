import { css } from '_panda/css';

export const customScrollStyle = css({
  '&::-webkit-scrollbar': {
    height: '4px',
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'white.white_10',
    borderRadius: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'white.white_25',
    borderRadius: '2px',
  },
});
