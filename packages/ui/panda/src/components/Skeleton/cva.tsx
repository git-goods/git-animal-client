import { cva } from '_panda/css';

export const skeletonStyle = cva({
  base: {
    overflow: 'hidden',
    backgroundSize: '200% 100%',
    animation: `skeletonLoading 1.5s infinite linear`,
    background:
      'linear-gradient(90deg, token(colors.gray.800) 25%, token(colors.gray.600) 50%, token(colors.gray.200) 75%, token(colors.gray.800) 100%)',
  },
  variants: {
    color: {
      white: {
        backgroundColor: 'white_10',
        background:
          'linear-gradient(90deg, token(colors.gray.800) 25%, token(colors.gray.600) 50%, token(colors.gray.200) 75%, token(colors.gray.800) 100%)',
      },
      black: {
        backgroundColor: 'black_10',
      },
    },
  },
  defaultVariants: {
    color: 'white',
  },
});
