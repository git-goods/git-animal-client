import { cva, RecipeVariantProps } from '_panda/css';

export const bannerStyle = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
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
      default: {
        backgroundColor: 'white.white_10',
      },
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

        _mobile: {
          width: '52px',
          height: '52px',
          borderRadius: '5px',
        },
      },
      medium: {
        width: '120px',
        padding: '12px 20px',
        height: '149px',
      },
    },
  },

  defaultVariants: {
    size: 'medium',
    status: 'default',
  },
});

export type BannerStyleProps = RecipeVariantProps<typeof bannerStyle>;
