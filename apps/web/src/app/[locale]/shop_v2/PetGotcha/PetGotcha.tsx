'use client';
import { useState } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';

import OnePet from './OnePet';

function PetGotcha() {
  const [openModal, setOpenModal] = useState<'one-pet' | 'ten-pet' | 'ratio-chart' | null>(null);

  return (
    <div className={containerStyle}>
      <Image src="/shop/pet-gotcha-bg.webp" alt="pet-gotcha-bg" width={1920} height={1226} className={bgStyle} />
      <h1 className={headingStyle}>Pet Gotcha</h1>
      <p className={descStyle}>Draw a S+ Grade pet for 1,000 points</p>
      <div className={buttonContainerStyle}>
        <Button size="l" onClick={() => setOpenModal('one-pet')}>
          1 Pet / 1,000 P
        </Button>
        <Button size="l">10 Pets / 10,000 P</Button>
        <Button size="l" variant="secondary">
          Ratio Chart
        </Button>
      </div>
      <div className={petContainerStyle}>
        <Image src="/shop/pet-gotcha-image-card.webp" alt="pet-gotcha-pet" width={1120} height={530} />
      </div>
      {openModal === 'one-pet' && <OnePet onClose={() => setOpenModal(null)} />}
    </div>
  );
}

export default PetGotcha;

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
