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
  shake: {
    '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
    '10%': { transform: 'translateX(-8px) rotate(-2deg)' },
    '20%': { transform: 'translateX(8px) rotate(2deg)' },
    '30%': { transform: 'translateX(-6px) rotate(-1.5deg)' },
    '40%': { transform: 'translateX(6px) rotate(1.5deg)' },
    '50%': { transform: 'translateX(-4px) rotate(-1deg)' },
    '60%': { transform: 'translateX(4px) rotate(1deg)' },
    '70%': { transform: 'translateX(-2px) rotate(-0.5deg)' },
    '80%': { transform: 'translateX(2px) rotate(0.5deg)' },
    '90%': { transform: 'translateX(-1px) rotate(0deg)' },
  },
  fadeInOut: {
    '0%, 100%': { opacity: '0.3' },
    '50%': { opacity: '0.7' },
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
  heartbeat: {
    '0%': { transform: 'scale(1)' },
    '14%': { transform: 'scale(1.3)' },
    '28%': { transform: 'scale(1)' },
    '42%': { transform: 'scale(1.3)' },
    '70%': { transform: 'scale(1)' },
  },
});
