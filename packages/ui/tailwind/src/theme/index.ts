import { colors } from './colors';

export const theme = {
  colors,
  fontFamily: {
    sans: ['system-ui', 'sans-serif'],
    mono: ['Menlo', 'monospace'],
    dnf: ['DNFBitBitv2', 'monospace'],
    product: ['Product Sans', 'system-ui', 'sans-serif'],
    dos: ['DOSGothic', 'system-ui', 'sans-serif'],
  },
  zIndex: {
    '-1': '-1',
    '0': '0',
    '1': '1',
    '2': '2',
    '10': '10',
    '20': '20',
    '30': '30',
    '40': '40',
    '50': '50',
    'dropdown': '1000',
    'sticky': '1100',
    'header': '1200',
    'overlay': '1300',
    'drawer': '1400',
    'modal': '1500',
    'popover': '1600',
    'toast': '1700',
    'tooltip': '1800',
    'loading': '9999',
  },
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.3s ease-in-out',
      'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      'gradient-move': 'gradientMove 3s ease infinite',
    },
    keyframes: {
      fadeIn: {
        from: {
          opacity: '0',
          transform: 'translateY(-20px)',
        },
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
      pulse: {
        '0%, 100%': {
          opacity: '1',
        },
        '50%': {
          opacity: '0.7',
        },
      },
      heartbeat: {
        '0%': {
          transform: 'scale(1)',
        },
        '25%': {
          transform: 'scale(1.3)',
        },
        '50%': {
          transform: 'scale(1)',
        },
        '75%': {
          transform: 'scale(1.15)',
        },
        '100%': {
          transform: 'scale(1)',
        },
      },
      gradientMove: {
        '0%': {
          backgroundPosition: '0% 50%',
        },
        '50%': {
          backgroundPosition: '100% 50%',
        },
        '100%': {
          backgroundPosition: '0% 50%',
        },
      },
    },
  },
};

export { colors } from './colors';