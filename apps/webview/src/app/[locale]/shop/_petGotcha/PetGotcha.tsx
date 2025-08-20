'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { userQueries } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import OnePet from './OnePet';
import { TenPet } from './TenPet';

export function PetGotcha() {
  const t = useTranslations('Gotcha');
  const [openModal, setOpenModal] = useState<'one-pet' | 'ten-pet' | 'ratio-chart' | 'one-pet-1' | null>(null);

  return (
    <div className={containerStyle}>
      <img src="/assets/shop/pet-gotcha-bg-m.webp" alt="pet-gotcha-bg" className={bgStyle} width={357} height={621} />
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

const containerStyle = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '100px 0',
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
  textStyle: 'glyph82.bold',
  color: 'white',

  _mobile: {
    textStyle: 'glyph40.bold',
  },
});

const descStyle = css({
  color: 'white',

  marginTop: '8px',
  textStyle: 'glyph16.regular',
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
