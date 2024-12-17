import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
  fadeIn: {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  fadeInUp: {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  jump: {
    '0%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
  bounce: {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-30px)',
    },
    '60%': {
      transform: 'translateY(-20px)',
    },
  },
  move: {
    '0%': {
      rotate: '-2deg',
    },
    '50%': {
      rotate: '2deg',
    },
    '100%': {
      rotate: '-2deg',
    },
  },
  move_5: {
    '0%': {
      rotate: '-5deg',
    },
    '50%': {
      rotate: '5deg',
    },
    '100%': {
      rotate: '-5deg',
    },
  },
  slide: {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
    },
    '100%': {
      transform: 'translate3d(-100%, 0, 0)',
    },
  },
  skeletonLoading: {
    '0%': {
      backgroundPosition: '200% 0',
    },
    '100%': {
      backgroundPosition: '-200% 0',
    },
  },
  animateSpin: {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
});
