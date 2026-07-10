'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useIsMobile } from '@gitanimals/react';
import { userQueries } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import OnePet from './OnePet';
import { TenPet } from './TenPet';

export function PetGotcha() {
  const t = useTranslations('Gotcha');
  const [openModal, setOpenModal] = useState<'one-pet' | 'ten-pet' | 'ratio-chart' | 'one-pet-1' | null>(null);

  return (
    <div className="relative flex flex-col items-center justify-center py-[120px] mobile:py-[100px]">
      <ResponsiveImage
        src="/shop/pet-gotcha-bg"
        alt="pet-gotcha-bg"
        width={{ mobile: 375, desktop: 1920 }}
        height={{ mobile: 621, desktop: 1226 }}
        className="absolute left-0 top-0 z-hide h-full w-full object-cover"
      />
      <h1 className="glyph82-bold text-white mobile:glyph40-bold">Pet Gotcha</h1>
      <p className="glyph24-regular mt-[16px] text-white mobile:glyph16-regular mobile:mt-[8px]">{t('pet-gotcha-desc')}</p>

      <ButtonWrapper onClickOnePet={() => setOpenModal('one-pet')} onClickTenPet={() => setOpenModal('ten-pet')} />

      <div className="mt-[150px] w-[60%] [&_img]:mx-auto [&_img]:object-contain mobile:mt-[80px] mobile:w-full mobile:px-[16px]">
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
      <div className="mt-[80px] flex gap-[16px] mobile:mt-[20px] mobile:gap-[8px] mobile:px-[16px]">
        <Button size={buttonSize} onClick={onClickOnePet} disabled={points < 1_000}>
          Get 1 Pet - 1,000pts
        </Button>
        <Button size={buttonSize} onClick={onClickTenPet} disabled={points < 10_000}>
          Get 10 Pets - 10,000pts
        </Button>
      </div>
    );
  });
