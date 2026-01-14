import { cn } from '@gitanimals/ui-tailwind';

export const wrapperCss = cn(
  'w-[calc(25%-24px)] flex flex-col',
  'max-mobile:w-[calc(50%-6px)] max-mobile:flex-row max-mobile:gap-[5px]',
);

export const imageCss = cn(
  'mb-2',
  'max-mobile:w-8 max-mobile:h-6 max-mobile:mb-0 max-mobile:object-contain max-mobile:object-[left_50%]',
);

export const textWrapperCss = cn('flex flex-col');

export const nicknameWrapperCss = cn(
  'flex items-center gap-[5px] mb-1',
  '[&_span]:font-product [&_span]:text-glyph-18 [&_span]:font-bold [&_span]:text-white-white/90',
  'max-mobile:mb-px',
  'max-mobile:[&_span]:text-glyph-15 max-mobile:[&_span]:font-bold',
);

export const roleCss = cn(
  'font-product text-glyph-16 text-white-white/75',
  'max-mobile:text-glyph-12',
);
