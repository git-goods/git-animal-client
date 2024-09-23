import { cva } from '_panda/css';

export const buttonStyle = cva({
  base: {
    padding: '8px 42px',
    borderRadius: '6px',
    border: '1px solid black',
    backgroundColor: 'brand.canary',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #c4c382 inset, 0px 3px 0px 0px #fdfed2 inset',
    color: '#000',
    fontFamily: 'Product Sans',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '150%',
    letterSpacing: '-0.3px',

    _hover: {
      filter: 'brightness(95%)',
    },
    _active: {
      filter: 'brightness(90%)',
    },

    _disabled: {
      backgroundColor: '#cccccc',
      boxShadow: '0px -3px 0px 0px #a3a3a3 inset, 0px 3px 0px 0px #dbdbdb inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      cursor: 'not-allowed',
      _hover: {
        filter: 'brightness(100%)',
      },
      _active: {
        filter: 'brightness(100%)',
      },
    },
  },
  variants: {
    variant: {
      primary: {},
      secondary: {
        backgroundColor: 'white.white',
        color: 'black.black',
        boxShadow:
          ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #A1A1B1 inset, 0px 3px 0px 0px #D2DCFE inset',
      },
    },
    size: {
      s: {
        padding: '0 24px',
        fontSize: '14px',
        minHeight: '32px',
      },
      m: {
        padding: '0 30px',
        fontSize: '16px',
        minHeight: '40px',
      },
      l: {
        padding: '25px 76px',
        fontSize: '20px',
        minHeight: '76px',
      },
    },
    floating: {
      true: {
        width: '100%',
        maxWidth: 'calc(100% - 32px)',
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'm',
    floating: false,
  },
});
