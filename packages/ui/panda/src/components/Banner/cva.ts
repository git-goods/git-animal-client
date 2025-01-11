import { cva, RecipeVariantProps } from '_panda/css';

export const bannerStyle = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    backgroundColor: 'white.white_10',
    transition: 'border 0.3s, background-color 0.3s',
    position: 'relative',
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  variants: {
    status: {
      selected: {
        border: '2px solid',
        borderColor: 'white.white_50',
        backgroundColor: 'white.white_25',
      },
      gradient: {
        background:
          'linear-gradient(133deg, rgba(255, 253, 201, 0.40) 2.19%, rgba(150, 230, 216, 0.40) 49.24%, rgba(125, 171, 241, 0.40) 98.21%)',
      },
      default: {},
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
    status: 'default',
  },
});

export type BannerStyleProps = RecipeVariantProps<typeof bannerStyle>;
