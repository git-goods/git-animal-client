import { cva } from '_panda/css';

export const skeletonStyle = cva({
  base: {
    backgroundColor: 'white_10',
    overflow: 'hidden',
    background:
      'linear-gradient(90deg, token(colors.gray.800) 25%, token(colors.gray.600) 50%, token(colors.gray.200) 75%, token(colors.gray.800) 100%)',
    backgroundSize: '200% 100%',
    animation: `skeletonLoading 1.5s infinite linear`,
  },
  variants: {
    color: {
      white: {
        backgroundColor: 'white_10',
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
