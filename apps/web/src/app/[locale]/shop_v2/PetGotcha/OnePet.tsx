import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { center } from '_panda/patterns';
import { X } from 'lucide-react';
import { toast } from 'sonner';

import type { AnimalTierType } from '@/components/AnimalCard/AnimalCard.constant';
import { useTimer } from '@/hooks/useTimer';
import { onePetGotcha } from '@/serverAction/gotcha';
import { getAnimalTierInfo } from '@/utils/animals';

import CardFlipGame from './CardFlipGame';

interface Props {
  onClose: () => void;
}

function OnePet({ onClose }: Props) {
  const t = useTranslations('Gotcha');
  const [getPersona, setGetPersona] = useState<{
    type: string;
    dropRate: string;
    tier: AnimalTierType;
  } | null>(null);

  const { count, isRunning, isFinished, startTimer, resetTimer } = useTimer(3);

  const onAction = async () => {
    try {
      const res = await onePetGotcha();

      const resultPersona = res.gotchaResults[0];
      const tier = getAnimalTierInfo(Number(resultPersona.ratio.replace('%', '')));

      const persona = {
        type: resultPersona.name,
        dropRate: resultPersona.ratio,
        tier: tier,
      };
      setGetPersona(persona);
      startTimer();
    } catch (error) {
      // TOdo:
      toast.error('Failed to get persona');
      onClose();
    }
  };

  useEffect(() => {
    // 3초 후에 닫기
    if (isFinished) {
      onClose();
      resetTimer();
    }
  }, [isFinished, onClose, resetTimer]);

  return (
    <article className={modalStyle}>
      <div className={modalContentStyle}>
        <button className={closeButtonStyle} onClick={onClose}>
          <X size={40} color="white" />
        </button>
        <h2 className={headingStyle}>{t('choose-one-card')}</h2>
        <CardFlipGame onClose={onClose} onGetPersona={onAction} getPersona={getPersona} />
        {isRunning && <p className={noticeMessageStyle}>{t('close-notice', { count })}</p>}
      </div>
    </article>
  );
}

export default OnePet;

const noticeMessageStyle = css({
  position: 'absolute',
  bottom: '100px',
  textStyle: 'glyph28.bold',
  color: 'white',
  textAlign: 'center',
});

const modalStyle = center({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'black.black_75',
  zIndex: 1000,
});

const modalContentStyle = center({
  backgroundColor: 'gray.gray_150',
  flexDirection: 'column',
  width: 'calc(100% - 400px)',
  minWidth: '1260px',
  maxWidth: '1540px',
  height: 'calc(100% - 120px)',
  maxHeight: '840px',
  borderRadius: '20px',
  position: 'relative',
});

const closeButtonStyle = css({
  position: 'absolute',
  right: '28px',
  top: '28px',
});

const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',
  marginBottom: '60px',
});
