import { cn } from '@gitanimals/ui-tailwind';

export const footer = cn(
  'flex flex-col gap-[120px] w-full text-white-white py-[120px] px-0',
  'max-mobile:py-[80px] max-mobile:px-4 max-mobile:gap-[60px]',
);

export const article = cn(
  'flex w-full max-w-[1120px] mx-auto',
  'max-mobile:flex-col max-mobile:gap-6',
);

export const title = cn(
  'w-[348px] shrink font-product text-glyph-28 font-bold text-white-white',
  'max-mobile:text-glyph-18 max-mobile:font-bold',
);

export const teamContentWrapper = cn(
  'w-full flex gap-6 flex-wrap',
  'max-mobile:gap-3',
);

export const repoContentWrapper = cn(
  'w-full flex flex-col gap-4',
);

export const repoLi = cn(
  'flex gap-2',
  'max-mobile:flex-col max-mobile:gap-px',
);

export const repoLiTitle = cn(
  'flex items-center gap-2 w-[226px] font-product text-glyph-18 font-bold',
  'max-mobile:text-glyph-15 max-mobile:font-bold max-mobile:gap-[17px]',
);

export const repoLiLink = cn(
  'font-product text-glyph-16 text-white-white/75 underline',
  'max-mobile:text-glyph-12 max-mobile:ml-[37px]',
);
