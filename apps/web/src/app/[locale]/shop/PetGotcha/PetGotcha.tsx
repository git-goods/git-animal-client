'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { userQueries } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import OnePet from './OnePet';
import { TenPet } from './TenPet';

export function PetGotcha() {
  const t = useTranslations('Gotcha');
  const [openModal, setOpenModal] = useState<'one-pet' | 'ten-pet' | 'ratio-chart' | null>(null);

  return (
    <div className={containerStyle}>
      <Image src="/shop/pet-gotcha-bg.webp" alt="pet-gotcha-bg" width={1920} height={1226} className={bgStyle} />
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
      <div className={buttonContainerStyle}>
        <Button size="l" onClick={onClickOnePet} disabled={points < 1_000}>
          1 Pet / 1,000 P
        </Button>
        <Button size="l" onClick={onClickTenPet} disabled={points < 10_000}>
          10 Pets / 10,000 P
        </Button>
      </div>
    );
  });

const containerStyle = css({
  position: 'relative',
  padding: '120px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const bgStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  objectFit: 'cover',
});

const headingStyle = css({
  textStyle: 'glyph82.bold',
  color: 'white',
});

const descStyle = css({
  textStyle: 'glyph24.regular',
  color: 'white',
  marginTop: '16px',
});

const buttonContainerStyle = css({
  display: 'flex',
  gap: '16px',
  marginTop: '80px',
});

const petContainerStyle = css({
  marginTop: '150px',
  width: '60%',
  '& img': {
    objectFit: 'contain',
    margin: '0 auto',
  },
});
