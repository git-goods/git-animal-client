import { cn } from '@gitanimals/ui-tailwind/utils';

export const section = cn(
  'relative flex flex-col items-center justify-center py-[120px] px-0 overflow-hidden gap-[60px]',
  'max-mobile:py-[80px] max-mobile:px-4 max-mobile:gap-5',
);

export const bg = cn(
  'absolute inset-0 z-hide',
  '[&_img]:w-full [&_img]:h-full [&_img]:object-cover',
);

export const heading = cn(
  'font-product text-glyph-82 font-bold text-white text-center max-w-[840px]',
  'max-mobile:text-glyph-40 max-mobile:font-bold',
);
