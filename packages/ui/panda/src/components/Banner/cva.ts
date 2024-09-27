import { cva, RecipeVariantProps } from '_panda/css';

export const bannerStyle = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'white.white_10',
    transition: 'border 0.3s, background-color 0.3s',
    position: 'relative',
    borderColor: 'transparent',
    overflow: 'hidden',
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
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        },
      },
      medium: {
        width: '120px',
        padding: '12px 20px',
      },
    },
  },

  defaultVariants: {
    size: 'medium',
    selected: false,
  },
});

export type BannerStyleProps = RecipeVariantProps<typeof bannerStyle>;
