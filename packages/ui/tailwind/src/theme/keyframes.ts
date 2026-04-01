/**
 * Animation Keyframes
 * Mapped from PandaCSS keyframes definitions
 */
export const keyframes = {
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeInUp: {
    from: { opacity: '0', transform: 'translateY(20px)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
  fadeInDown: {
    from: { opacity: '0', transform: 'translateY(-20px)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
  jump: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  bounce: {
    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
    '40%': { transform: 'translateY(-30px)' },
    '60%': { transform: 'translateY(-20px)' },
  },
  move: {
    '0%, 100%': { rotate: '-2deg' },
    '50%': { rotate: '2deg' },
  },
  move5: {
    '0%, 100%': { rotate: '-5deg' },
    '50%': { rotate: '5deg' },
  },
  slide: {
    '0%': { transform: 'translate3d(0, 0, 0)' },
    '100%': { transform: 'translate3d(-100%, 0, 0)' },
  },
  skeletonLoading: {
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
  },
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.7' },
  },
  heartbeat: {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.3)' },
    '50%': { transform: 'scale(1)' },
    '75%': { transform: 'scale(1.15)' },
    '100%': { transform: 'scale(1)' },
  },
  gradientMove: {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
};

export const animation: Record<string, string> = {
  'fade-in': 'fadeIn 0.3s ease-in-out',
  'fade-in-up': 'fadeInUp 0.3s ease-in-out',
  'fade-in-down': 'fadeInDown 0.3s ease-in-out',
  jump: 'jump 0.5s ease-in-out',
  bounce: 'bounce 1s ease-in-out',
  move: 'move 0.5s ease-in-out infinite',
  move5: 'move5 0.5s ease-in-out infinite',
  slide: 'slide 20s linear infinite',
  skeleton: 'skeletonLoading 1.5s ease-in-out infinite',
  spin: 'spin 1s linear infinite',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  heartbeat: 'heartbeat 1.5s ease-in-out infinite',
  'gradient-move': 'gradientMove 3s ease infinite',
};
