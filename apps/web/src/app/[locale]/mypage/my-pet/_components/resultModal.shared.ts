// NOTE: This module intentionally couples the evolution & merge result modal visuals — both modals share identical container/content variants and styles.

export const containerStyle =
  'absolute top-0 right-0 bottom-0 left-0 w-full h-full flex items-center justify-center bg-black-50 z-50 cursor-pointer';

export const containerInnerVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      duration: 0.7,
      bounce: 0.5,
    },
  },
  exit: { scale: 0, rotate: 180, transition: { duration: 0.5 } },
};

export const containerInnerStyle = 'bg-gray-150 relative rounded-[16px] px-[48px] py-[36px]';

export const closeButtonStyle = 'absolute top-[8px] right-[8px] p-[2px] rounded-full';

export const contentStyle = 'flex flex-col items-center gap-[12px] text-center';

export const contentStaggerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.3 } },
};
