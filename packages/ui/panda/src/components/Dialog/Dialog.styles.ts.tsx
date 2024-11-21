import { cva } from '_panda/css';

export const dialogContentCva = cva({
  base: {},
  variants: {
    size: {
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
        borderRadius: '16px',
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
          width: '1400px',
          height: 'fit-content',
        },
      },
    },
  },
});
