import { cn } from '@gitanimals/ui-tailwind';

export const container = cn(
  'flex flex-col items-center justify-center relative py-[120px] px-0 gap-[60px] bg-[#171717]',
  'max-mobile:py-[80px] max-mobile:gap-10',
);

export const content = cn(
  'relative z-floating flex flex-col items-center justify-center gap-[60px]',
  'max-mobile:gap-10',
);

export const heading = cn(
  'font-product text-glyph-82 font-bold text-white',
  'max-mobile:text-glyph-32 max-mobile:font-bold',
);

export const infoContainer = cn(
  'flex flex-row justify-between gap-[60px] py-10 px-[52px] max-w-[766px] w-full bg-white/10 rounded-2xl',
  'max-mobile:flex-col max-mobile:max-w-[calc(100%-40px)] max-mobile:gap-3 max-mobile:p-6',
);

export const infoItem = cn(
  'w-fit',
  '[&_p:first-child]:font-product [&_p:first-child]:text-glyph-48 [&_p:first-child]:font-bold [&_p:first-child]:text-[#FDFAFF]',
  'max-mobile:[&_p:first-child]:text-glyph-24 max-mobile:[&_p:first-child]:font-bold',
  '[&_p:last-child]:font-product [&_p:last-child]:text-glyph-18 [&_p:last-child]:font-bold [&_p:last-child]:text-white/50',
  'max-mobile:[&_p:last-child]:text-glyph-14',
);

export const buttonWrapper = cn(
  'pt-5',
  'max-mobile:pt-0',
);

const bgPicture = 'absolute left-0 right-0 z-0';

export const bgPictureTop = cn(bgPicture, 'top-0');

export const bgPictureBottom = cn(bgPicture, 'bottom-0');
