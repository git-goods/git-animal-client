import { cn } from '@gitanimals/ui-tailwind';

export const container = cn(
  'w-fit h-fit mx-auto rounded-2xl bg-white/10'
);

export const tab = cn(
  'flex gap-0 items-center justify-center pt-10',
  '[&_button]:py-1 [&_button]:px-2.5 [&_button]:text-white [&_button]:font-product [&_button]:text-glyph-18 [&_button]:opacity-50',
  '[&_button.active]:opacity-100 [&_button.active]:font-bold',
  'max-mobile:pt-[26px]',
  'max-mobile:[&_button]:py-0.5 max-mobile:[&_button]:px-2 max-mobile:[&_button]:text-glyph-16'
);

export const sliderContainer = cn(
  'relative w-[1120px] h-[800px]',
  'max-mobile:w-[calc(100vw-40px)] max-mobile:h-auto'
);

export const sliderItem = cn('w-fit h-fit');
