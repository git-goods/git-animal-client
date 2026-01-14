import { cn } from '@gitanimals/ui-tailwind/utils';

export const itemImage = cn('px-6');

export const itemContainer = cn(
  'p-[40px_40px_60px_40px] flex flex-col gap-10',
  'max-mobile:gap-7 max-mobile:p-[20px_20px_28px_20px]'
);

export const itemHgroup = cn(
  'px-5 text-white text-left',
  '[&_h2]:font-product [&_h2]:text-glyph-32 [&_h2]:font-bold [&_h2]:max-mobile:text-glyph-18',
  '[&_p]:mt-2 [&_p]:font-product [&_p]:text-glyph-18 [&_p]:max-mobile:text-glyph-14'
);
