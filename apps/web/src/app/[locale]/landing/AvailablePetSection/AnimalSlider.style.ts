import { grid } from '_panda/patterns';

export const cardContainer = grid({
  gap: '20px',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  width: '1120px',
  height: '1024px',
  padding: '0 1px',
  display: 'grid',

  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    width: '835px',
    margin: '0 auto',

    '& > div:nth-child(n + 10)': {
      display: 'none',
    },
  },
  '@media (max-width: 900px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    width: '530px',

    '& > div:nth-child(n + 7)': {
      display: 'none',
    },
  },
});

export const cardContainerMobile = grid({
  width: '265px',
  height: '325px',
  padding: '0 1px',

  // 0.75배

  '@media (max-width: 400px)': {
    width: '200px',
    height: '244px',

    '& .animal-card-info': {
      bottom: '10px',
    },
    '& .animal-card-type': {
      textStyle: 'glyph18.bold',
    },
    '& .animal-card-rating': {
      textStyle: 'glyph16.regular',
    },
  },
});
