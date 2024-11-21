import { css, cva, RecipeVariantProps } from '_panda/css';

export const selectTriggerStyle = cva({
  base: {
    textStyle: 'glyph16.regular',
    color: 'white.white_90',
    width: 'fit-content',
    height: '36px',
    padding: '6px 8px',
    borderRadius: 10,
    backgroundColor: 'white.white_25',
  },

  variants: {
    size: {
      sm: {
        height: '30px',
        backgroundColor: 'white.white_5',
      },
    },
  },
});

export type SelectTriggerStyleProps = RecipeVariantProps<typeof selectTriggerStyle>;

export const selectContentStyle = css({
  backgroundColor: 'black.black_75',
  borderRadius: 10,
  border: '1px solid',
  borderColor: 'black.black_50',
  color: 'white',
});

export const selectItemStyle = css({
  color: 'white',
  textStyle: 'glyph16.regular',

  _hover: {
    backgroundColor: 'white.white_5',
  },
  _focus: {
    backgroundColor: 'white.white_5',
  },
});
