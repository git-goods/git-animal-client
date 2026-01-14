import { cn } from '@gitanimals/ui-tailwind';

export const section = cn(
  'py-[120px] px-0 bg-brand-beige',
  'max-mobile:py-[80px] max-mobile:px-4',
);

export const heading = cn(
  'text-black-black font-product text-glyph-48 font-bold text-center mb-[80px]',
);

export const wayContainer = cn(
  'grid grid-cols-2 max-w-[1120px] gap-6 mx-auto',
  'max-mobile:grid-cols-1',
);

export const wayItem = cn(
  'relative flex flex-col gap-3 justify-between',
  'max-mobile:gap-1',
);

export const wayItemHeading = cn(
  'font-product text-glyph-32 font-bold flex items-center gap-3 p-[40px_40px_0_40px]',
  '[&_span]:font-product [&_span]:text-glyph-22 [&_span]:block [&_span]:w-8 [&_span]:h-8 [&_span]:bg-black-black [&_span]:text-white-white [&_span]:text-center',
  'max-mobile:text-glyph-20 max-mobile:font-bold',
  'max-mobile:[&_span]:text-glyph-16 max-mobile:[&_span]:w-6 max-mobile:[&_span]:h-6',
);

export const wayItemDesc = cn(
  'font-product text-glyph-18 mt-4 px-10 text-black-black/90',
  'max-mobile:text-glyph-14',
);

export const wayItemImage = cn('w-full');
