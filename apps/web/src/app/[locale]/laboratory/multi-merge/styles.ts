import { cn } from '@gitanimals/ui-tailwind';

// Modal 스타일
export const modalOverlayStyle = cn(
  'fixed inset-0 bg-black/95',
  'flex items-center justify-center',
  'p-4 z-modal'
);

export const modalContainerStyle = cn(
  'bg-black rounded-2xl',
  'w-full max-w-[80rem] max-h-[95vh]',
  'overflow-hidden flex flex-col'
);

// Header 스타일
export const headerStyle = 'px-8 py-6';

export const titleStyle = cn(
  'text-[30px] font-bold text-white text-center'
);

export const closeButtonStyle = cn(
  'text-gray-400 transition-colors cursor-pointer',
  'hover:text-white'
);

// Content 스타일
export const contentSectionStyle = 'px-8 py-3';

export const instructionTextStyle = 'px-8 pb-4';

export const instructionStyle = cn(
  'text-gray-400 text-sm text-center'
);

// Filter 스타일
export const filterSectionStyle = cn(
  'px-8 pb-4',
  'flex items-center justify-end gap-3'
);

export const selectStyle = cn(
  'bg-gray-200 text-gray-400',
  'px-4 py-2 rounded-lg text-sm',
  'border border-gray-300 outline-none',
  'focus:border-gray-400'
);

// Button 스타일
export const mergeButtonStyle = cn(
  'w-full p-4',
  'bg-gray-400 text-gray-600',
  'font-bold rounded-xl text-lg',
  'transition-all cursor-pointer',
  'hover:bg-gray-300',
  'disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed',
  'disabled:hover:bg-gray-300'
);
