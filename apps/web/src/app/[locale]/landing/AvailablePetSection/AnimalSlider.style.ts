import { cn } from '@gitanimals/ui-tailwind/utils';

export const cardContainer = cn(
  'grid gap-5 justify-center grid-cols-[repeat(4,1fr)] grid-rows-[repeat(3,1fr)] w-[1120px] h-[1024px] px-px',
  'max-[1200px]:grid-cols-[repeat(3,1fr)] max-[1200px]:grid-rows-[repeat(3,1fr)] max-[1200px]:w-[835px] max-[1200px]:mx-auto',
  'max-[1200px]:[&>div:nth-child(n+10)]:hidden',
  'max-[900px]:grid-cols-[repeat(2,1fr)] max-[900px]:grid-rows-[repeat(3,1fr)] max-[900px]:w-[530px]',
  'max-[900px]:[&>div:nth-child(n+7)]:hidden',
);

export const cardContainerMobile = cn(
  'grid w-[265px] h-[325px] px-px',
  'max-[400px]:w-[200px] max-[400px]:h-[244px]',
  'max-[400px]:[&_.animal-card-info]:bottom-2.5',
  'max-[400px]:[&_.animal-card-type]:font-product max-[400px]:[&_.animal-card-type]:text-glyph-18 max-[400px]:[&_.animal-card-type]:font-bold',
  'max-[400px]:[&_.animal-card-rating]:font-product max-[400px]:[&_.animal-card-rating]:text-glyph-16',
);
