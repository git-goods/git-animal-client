import { cva } from '_panda/css';

export const buttonStyle = cva({
  base: {
    display: 'flex',
    backgroundColor: 'brand.sky',
  },
  variants: {
    visual: {
      foo: { border: '1px solid black' },
      bar: { border: '1px solid red' },
    },
    size: {
      sm: { padding: '4', fontSize: 'sm' },
      md: { padding: '6', fontSize: 'md' },
    },
  },
  defaultVariants: {
    visual: 'foo',
    size: 'sm',
  },
});
