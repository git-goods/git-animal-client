/**
 * Keyframes — panda(`packages/ui/panda/src/theme/keyframes.ts`)의 원본 이름을 보존한다(토큰감사 §2.5).
 * 변환 시 panda 컴포넌트의 animation 참조와 keyframe 이름이 일치해야 하므로
 * `move_5`/`animateSpin` 등의 이름을 그대로 둔다(dev 의 move5/spin rename 은 되돌림).
 *
 * `fadeInDown`/`pulse`/`heartbeat`/`gradientMove` 는 panda 토큰에는 없고 apps/web `globals.css`
 * 에서 쓰던 애니메이션이라 함께 보존한다.
 */
export const keyframes = {
  // --- panda 원본 ---
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeInUp: {
    from: { opacity: '0', transform: 'translateY(20px)' },
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
  move_5: {
    '0%, 100%': { rotate: '-5deg' },
    '50%': { rotate: '5deg' },
  },
  slide: {
    '0%': { transform: 'translate3d(0, 0, 0)' },
    '100%': { transform: 'translate3d(-100%, 0, 0)' },
  },
  slideFromRight: {
    from: { transform: 'translateX(30%)' },
    to: { transform: 'translateX(0)' },
  },
  slideFromLeft: {
    from: { transform: 'translateX(-30%)' },
    to: { transform: 'translateX(0)' },
  },
  skeletonLoading: {
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
  },
  animateSpin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },

  // --- apps/web globals.css 유래 ---
  fadeInDown: {
    from: { opacity: '0', transform: 'translateY(-20px)' },
    to: { opacity: '1', transform: 'translateY(0)' },
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

  // --- Accordion (shadcn 표준, radix content-height 변수 사용) ---
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  },
};

export const animation: Record<string, string> = {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'fade-in': 'fadeIn 0.3s ease-in-out',
  'fade-in-up': 'fadeInUp 0.3s ease-in-out',
  'fade-in-down': 'fadeInDown 0.3s ease-in-out',
  jump: 'jump 0.5s ease-in-out',
  bounce: 'bounce 1s ease-in-out',
  move: 'move 0.5s ease-in-out infinite',
  'move-5': 'move_5 0.5s ease-in-out infinite',
  slide: 'slide 20s linear infinite',
  'slide-from-right': 'slideFromRight 0.3s ease-in-out',
  'slide-from-left': 'slideFromLeft 0.3s ease-in-out',
  skeleton: 'skeletonLoading 1.5s linear infinite',
  spin: 'animateSpin 1s linear infinite',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  heartbeat: 'heartbeat 1.5s ease-in-out infinite',
  'gradient-move': 'gradientMove 3s ease infinite',
};
