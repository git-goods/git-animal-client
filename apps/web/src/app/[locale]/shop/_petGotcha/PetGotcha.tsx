'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { userQueries } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind';
import { Button } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import OnePet from './OnePet';
import { TenPet } from './TenPet';

export function PetGotcha() {
  const t = useTranslations('Gotcha');
  const [openModal, setOpenModal] = useState<'one-pet' | 'ten-pet' | 'ratio-chart' | 'one-pet-1' | null>(null);

  return (
    <div className={containerStyle}>
      <ResponsiveImage
        src="/shop/pet-gotcha-bg"
        alt="pet-gotcha-bg"
        width={{ mobile: 375, desktop: 1920 }}
        height={{ mobile: 621, desktop: 1226 }}
        className={bgStyle}
      />
      <h1 className={headingStyle}>Pet Gotcha</h1>
      <p className={descStyle}>{t('pet-gotcha-desc')}</p>

      <ButtonWrapper onClickOnePet={() => setOpenModal('one-pet')} onClickTenPet={() => setOpenModal('ten-pet')} />

      <div className={petContainerStyle}>
        <Image src="/shop/pet-gotcha-image-card.webp" alt="pet-gotcha-pet" width={1120} height={530} />
      </div>
      {openModal === 'one-pet' && <OnePet onClose={() => setOpenModal(null)} />}
      {openModal === 'ten-pet' && <TenPet onClose={() => setOpenModal(null)} />}
    </div>
  );
}

function ResponsiveImage({
  width,
  height,
  src,
  alt,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof Image>, 'width' | 'height'> & {
  width: { mobile: number; desktop: number };
  height: { mobile: number; desktop: number };
}) {
  const isMobile = useIsMobile();
  return (
    <Image
      src={isMobile ? `${src}-m.webp` : `${src}.webp`}
      width={width[isMobile ? 'mobile' : 'desktop']}
      height={height[isMobile ? 'mobile' : 'desktop']}
      alt={alt}
      {...props}
    />
  );
}

interface ButtonWrapperProps {
  onClickOnePet: () => void;
  onClickTenPet: () => void;
}

const ButtonWrapper = wrap
  .Suspense({ fallback: null })
  .ErrorBoundary({
    fallback: ({ reset }) => (
      <div>
        <span>에러가 발생했어요</span>
        <Button size="l" onClick={reset}>
          재시도하기
        </Button>
      </div>
    ),
  })
  .on(({ onClickOnePet, onClickTenPet }: ButtonWrapperProps) => {
    const { data } = useSuspenseQuery(userQueries.userOptions());
    const isMobile = useIsMobile();
    const buttonSize = isMobile ? 's' : 'l';

    const points = Number(data.points);

    return (
      <div className={buttonContainerStyle}>
        <Button size={buttonSize} onClick={onClickOnePet} disabled={points < 1_000}>
          Get 1 Pet - 1,000pts
        </Button>
        <Button size={buttonSize} onClick={onClickTenPet} disabled={points < 10_000}>
          Get 10 Pets - 10,000pts
        </Button>
      </div>
    );
  });

const containerStyle = cn(
  'relative py-[120px] flex flex-col items-center justify-center',
  'max-mobile:py-[100px]'
);

const bgStyle = cn(
  'absolute top-0 left-0 w-full h-full z-hide object-cover'
);

const headingStyle = cn(
  'font-product text-glyph-82 font-bold text-white',
  'max-mobile:text-glyph-40'
);

const descStyle = cn(
  'font-product text-glyph-24 text-white mt-4',
  'max-mobile:mt-2 max-mobile:text-glyph-16'
);

const buttonContainerStyle = cn(
  'flex gap-4 mt-20',
  'max-mobile:gap-2 max-mobile:px-4 max-mobile:mt-5'
);

const petContainerStyle = cn(
  'mt-[150px] w-[60%] [&_img]:object-contain [&_img]:mx-auto',
  'max-mobile:w-full max-mobile:px-4 max-mobile:mt-20'
);
