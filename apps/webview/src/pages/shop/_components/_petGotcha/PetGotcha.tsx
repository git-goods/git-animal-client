'use client';

import { useState } from 'react';
import { css } from '_panda/css';
import { userQueries } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import OnePet from './OnePet';
import { TenPet } from './TenPet';
import { useTranslation } from 'react-i18next';

export function PetGotcha() {
  const { t } = useTranslation('gotcha');
  const [openModal, setOpenModal] = useState<'one-pet' | 'ten-pet' | 'ratio-chart' | 'one-pet-1' | null>(null);

  return (
    <div className={containerStyle}>
      <img src="/assets/shop/pet-gotcha-bg-m.webp" alt="pet-gotcha-bg" className={bgStyle} width={375} height={621} />
      <h1 className={headingStyle}>Pet Gotcha</h1>
      <p className={descStyle}>{t('pet-gotcha-desc')}</p>

      <ButtonWrapper onClickOnePet={() => setOpenModal('one-pet')} onClickTenPet={() => setOpenModal('ten-pet')} />

      <div className={petContainerStyle}>
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
      <div className={buttonContainerStyle}>
        <Button size="s" onClick={onClickOnePet} disabled={points < 1_000}>
          Get 1 Pet - 1,000pts
        </Button>
        <Button size="s" onClick={onClickTenPet} disabled={points < 10_000}>
          Get 10 Pets - 10,000pts
        </Button>
      </div>
    );
  });

const containerStyle = css({
  position: 'relative',
  padding: '100px 0',
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
  zIndex: 'hide',
  objectFit: 'cover',
});

const headingStyle = css({
  textStyle: 'glyph40.bold',
  color: 'white',
});

const descStyle = css({
  textStyle: 'glyph16.regular',
  color: 'white',
  marginTop: '8px',
});

const buttonContainerStyle = css({
  display: 'flex',

  gap: '8px',
  paddingInline: '16px',
  marginTop: '20px',
});

const petContainerStyle = css({
  '& img': {
    objectFit: 'contain',
    margin: '0 auto',
  },
  width: '100%',
  paddingInline: '16px',
  marginTop: '80px',
});
