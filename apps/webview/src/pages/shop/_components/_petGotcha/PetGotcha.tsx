'use client';

import { useState } from 'react';
import { userQueries } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import OnePet from './OnePet';
import { TenPet } from './TenPet';

export function PetGotcha() {
  const { t } = useTranslation('gotcha');
  const [openModal, setOpenModal] = useState<'one-pet' | 'ten-pet' | 'ratio-chart' | 'one-pet-1' | null>(null);

  return (
    <div className="relative flex flex-col items-center justify-center py-[100px]">
      <img
        src="/assets/shop/pet-gotcha-bg-m.webp"
        alt="pet-gotcha-bg"
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        width={375}
        height={621}
      />
      <h1 className="font-product text-glyph-40 font-bold text-white">Pet Gotcha</h1>
      <p className="mt-2 font-product text-glyph-16 text-white">{t('pet-gotcha-desc')}</p>

      <ButtonWrapper onClickOnePet={() => setOpenModal('one-pet')} onClickTenPet={() => setOpenModal('ten-pet')} />

      <div className="mt-20 w-full px-4 [&_img]:mx-auto [&_img]:object-contain">
        <img src="/assets/shop/pet-gotcha-image-card.webp" alt="pet-gotcha-pet" width={1120} height={530} />
      </div>
      {openModal === 'one-pet' && <OnePet onClose={() => setOpenModal(null)} />}
      {openModal === 'ten-pet' && <TenPet onClose={() => setOpenModal(null)} />}
    </div>
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

    const points = Number(data.points);

    return (
      <div className="mt-5 flex gap-2 px-4">
        <Button size="s" onClick={onClickOnePet} disabled={points < 1_000}>
          Get 1 Pet - 1,000pts
        </Button>
        <Button size="s" onClick={onClickTenPet} disabled={points < 10_000}>
          Get 10 Pets - 10,000pts
        </Button>
      </div>
    );
  });
