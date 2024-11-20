import { cva } from '_panda/css';

export const buttonStyle = cva({
  base: {
    padding: '8px 42px',
    borderRadius: '6px',
    border: '1px solid black',
    fontFamily: 'Product Sans',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '150%',
    letterSpacing: '-0.3px',
    transition: 'filter 0.2s, box-shadow 0.2s',
    backgroundColor: 'brand.canary',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #c4c382 inset, 0px 3px 0px 0px #fdfed2 inset',
    color: '#000',

    _disabled: {
      cursor: 'not-allowed',
    },
  },
  variants: {
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
        height: '40px',
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
    variant: {
      primary: {
        background: 'brand.canary',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #c4c382 inset, 0px 3px 0px 0px #fdfed2 inset',
        color: '#000',

        _hover: {
          backgroundColor: '#EAE78A',
          boxShadow:
            '0px 4px 16px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #C4C382 inset, 0px 3px 0px 0px #fdfed2 inset',
        },
        _active: {
          boxShadow:
            '0px 4px 16px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #C4C382 inset, 0px 3px 0px 0px #fdfed2 inset',
        },

        _disabled: {
          border: '1px solid #000',
          backgroundColor: 'gray.gray_800',
          boxShadow:
            '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #a3a3a3 inset, 0px 3px 0px 0px #dbdbdb inset',

          _hover: {
            backgroundColor: 'gray.gray_800',
            boxShadow:
              '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #a3a3a3 inset, 0px 3px 0px 0px #dbdbdb inset',
          },
          _active: {
            backgroundColor: 'gray.gray_800',
            boxShadow:
              '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #a3a3a3 inset, 0px 3px 0px 0px #dbdbdb inset',
          },
        },
      },
      secondary: {
        borderRadius: '6px',
        border: '1px solid #000',
        backgroundColor: '#FFF',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #A1A1B1 inset, 0px 3px 0px 0px #D2DCFE inset',

        _hover: {
          backgroundColor: 'gray.gray_900',
          boxShadow:
            '0px 4px 16px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #A1A1B1 inset, 0px 3px 0px 0px #D2DCFE inset',
        },

        _disabled: {
          backgroundColor: 'gray.gray_800',
          boxShadow:
            '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #A3A3A3 inset, 0px 3px 0px 0px #DBDBDB inset',
          _hover: {
            backgroundColor: 'gray.gray_800',
            boxShadow:
              '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 0px 0px #A3A3A3 inset, 0px 3px 0px 0px #DBDBDB inset',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'm',
    floating: false,
  },
});
