import { cva } from '_panda/css';

export const bannerStyle = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 20px',
    width: '120px',
    height: '120px',
    borderRadius: 12,
    backgroundColor: 'white.white_10',
  },
  variants: {
    selected: {
      true: {
        border: '2px solid',
        borderColor: 'white.white_50',
        backgroundColor: 'white.white_25',
      },
      false: {},
    },
    size: {
      small: {
        width: '80px',
        height: '80px',
      },
      medium: {
        width: '160px',
        height: '160px',
      },
    },
  },

  defaultVariants: {
    size: 'medium',
    selected: false,
  },
});
