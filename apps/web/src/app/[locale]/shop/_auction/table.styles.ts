import { cn } from '@gitanimals/ui-tailwind/utils';

export const tableCss = cn(
  'w-full mb-8',
  'max-mobile:mb-3'
);

export const theadCss = cn(
  'grid grid-cols-[1fr_2.5fr_1fr_1fr_4.2fr_1.5fr] gap-4',
  'px-8 py-1 rounded-xl bg-white/50',
  'items-center h-[46px]',
  'font-product text-glyph-18 font-bold text-white',
  '[&>span:nth-child(1)]:text-center',
  'mb-1',
  'max-mobile:hidden'
);

export const tbodyCss = cn(
  'flex flex-col gap-1',
  'max-mobile:min-h-[428px]'
);
