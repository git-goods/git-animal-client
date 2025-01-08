import { css, cva, RecipeVariantProps } from '_panda/css';

export const dialogContentCva = cva({
  base: {
    background: 'gray.gray_150',
    borderRadius: '16px',
    border: '1px solid',
    borderColor: 'gray.gray_150',
    zIndex: 3001,
    color: 'white.white_100',
  },
  variants: {
    size: {
      default: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '28px',
        color: 'white',
        '& .dialog-title': {
          textStyle: 'glyph20.regular',
          textAlign: 'left',
          width: '100%',
        },
      },
      large: {
        borderRadius: '16px',
        backgroundColor: 'gray.gray_150',
        padding: '60px 40px',

        maxWidth: 'calc(100% - 400px)',
        maxHeight: 'calc(100% - 240px)',
        width: '100%',
        height: '100%',

        '@media (max-width: 1200px)': {
          padding: '48px 24px',
          maxWidth: 'calc(100vw - 240px)',
          maxHeight: 'calc(100vh - 120px)',
        },
        _mobile: {
          maxWidth: '100vw',
          maxHeight: '100vh',
          borderRadius: '0px',
        },
      },
      screen: {
        margin: 'auto',
        borderRadius: '0',
        backgroundColor: 'gray.gray_150',
        padding: '24px',
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        '@media (min-width: 1920px)': {
          borderRadius: '16px',
          width: '1400px',
          height: 'fit-content',
        },
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export type DialogContentVariants = RecipeVariantProps<typeof dialogContentCva>;

export const dialogTitleStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white.white_100',
  textAlign: 'center',
  '@media (max-width: 1200px)': {
    textStyle: 'glyph32.bold',
  },
  _mobile: {
    textStyle: 'glyph24.bold',
  },
});
