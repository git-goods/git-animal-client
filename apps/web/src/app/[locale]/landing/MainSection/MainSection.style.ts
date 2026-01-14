import { cn } from '@gitanimals/ui-tailwind/utils';

export const section = cn(
  'pt-[120px] pb-[120px] text-center relative',
  'flex flex-col items-center justify-center overflow-x-hidden',
  'max-mobile:p-[80px_12px]',
  '[&_.mobile]:hidden [&_.mobile]:max-mobile:block',
  '[&_.desktop]:block [&_.desktop]:max-mobile:hidden'
);

export const heading = cn(
  'font-product text-glyph-82 font-bold max-w-[800px] text-white',
  'max-mobile:text-glyph-40'
);

export const desc = cn(
  'font-product text-glyph-24 max-w-[600px] text-white mt-4 mb-10',
  'max-mobile:text-glyph-16 max-mobile:mb-5 max-mobile:mt-5'
);

export const bg = cn(
  'absolute bottom-0 left-0 right-0 top-0 z-hide w-full h-full',
  'bg-gradient-to-br from-[#016EDB] via-[#16B7CD] to-[#5CCA69]',
  '[&_img]:w-full [&_img]:h-full [&_img]:object-cover'
);

export const sliderContainer = cn('mt-20');
