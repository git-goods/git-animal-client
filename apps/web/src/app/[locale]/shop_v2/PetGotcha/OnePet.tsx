import React, { useEffect, useState } from 'react';
import { css } from '_panda/css';

import { onePetGotcha } from '@/actions/gotcha';
import { getAnimalTierInfo } from '@/components/AnimalCard/AnimalCard';
import type { AnimalTierType } from '@/components/AnimalCard/AnimalCard.constant';

import CardFlipGame from './CardFlipGame';

interface Props {
  onClose: () => void;
}

function OnePet({ onClose }: Props) {
  const [getPersona, setGetPersona] = useState<{
    type: string;
    dropRate: string;
    tier: AnimalTierType;
  } | null>(null);

  const onAction = async () => {
    try {
      const res = await onePetGotcha();
      const tier = getAnimalTierInfo(Number(res.ratio.replace('%', '')));

      const persona = {
        type: res?.name,
        dropRate: res?.ratio,
        tier: tier,
      };
      setGetPersona(persona);
    } catch (error) {
      // TOdo:
    }
  };

  useEffect(() => {
    if (getPersona) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  }, [getPersona, onClose]);

  return (
    <div className={containerStyle}>
      <h2 className={headingStyle}>Choose one card you want!</h2>
      <CardFlipGame onClose={onClose} onAction={onAction} getPersona={getPersona} />
    </div>
  );
}

export default OnePet;

const containerStyle = css({
  position: 'fixed',

  backgroundColor: 'gray.gray_150',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  padding: '224px 200px',
});

const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',
  marginBottom: '60px',
});
