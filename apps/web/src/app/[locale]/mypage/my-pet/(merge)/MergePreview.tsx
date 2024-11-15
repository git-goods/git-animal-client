/* eslint-disable @next/next/no-img-element */
import type { PropsWithChildren } from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import type { Persona } from '@gitanimals/api';
import { motion } from 'framer-motion';

import { getPersonaImage } from '@/utils/image';

type MergePersonaProps = {
  targetPersona: Persona | null;
  materialPersona: Persona | null;
};

const mergePersona = ({ targetPersona, materialPersona }: MergePersonaProps) => {
  if (!targetPersona || !materialPersona) return undefined;

  const materialLevel = Number(materialPersona.level) > 0 ? Number(materialPersona.level) : 1;

  return {
    ...targetPersona,
    level: String(Number(targetPersona.level) + materialLevel),
  };
};

export const MergePreview = ({ materialPersona, targetPersona }: MergePersonaProps) => {
  const resultPersona = mergePersona({ targetPersona, materialPersona });

  return (
    <div className={containerStyle}>
      <div className={itemContainerStyle}>
        {targetPersona ? <MergeItem persona={targetPersona} /> : <MergeEmptyItem />}
        <div className={plusSignStyle}>+</div>
        {materialPersona ? <MergeItem persona={materialPersona} /> : <MergeEmptyItem />}

        <div className={arrowStyle}>=</div>
        <ResultItemAnimation isVisible={Boolean(resultPersona)} key={resultPersona?.id}>
          {resultPersona ? <MergeItem persona={resultPersona} /> : <MergeEmptyItem />}
        </ResultItemAnimation>
      </div>
    </div>
  );
};

const containerStyle = css({
  position: 'relative',
  padding: '32px',
  overflow: 'hidden',
  minHeight: 'fit-content',
});

const itemContainerStyle = flex({
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
});

const itemStyle = css({
  position: 'relative',
  width: '120px',
  // height: '120px',
  backgroundColor: 'gray.700',
  padding: '8px',
});

const imageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

const levelTextStyle = css({
  textAlign: 'center',
  marginTop: '8px',
  fontSize: '14px',
});

const plusSignStyle = css({
  fontSize: '24px',
  fontWeight: 'bold',
});

const arrowStyle = css({
  marginX: '16px',
});

const flashEffectStyle = css({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'white',
  borderRadius: '8px',
});

function MergeEmptyItem() {
  return (
    <div className={itemStyle}>
      <img src="/mypage/merge/merge-empty.svg" alt="empty" className={imageStyle} />
      <div className={levelTextStyle}>Level ?</div>
    </div>
  );
}

function MergeItem({ persona }: PropsWithChildren<{ persona: Persona }>) {
  return (
    <div className={itemStyle}>
      <div className={mergeItemStyle}>
        <img src={getPersonaImage(persona.type)} alt="Level 3 Fish" className={imageStyle} />
      </div>
      <div className={levelTextStyle}>Level {persona.level}</div>
    </div>
  );
}

const mergeItemStyle = css({
  borderRadius: '16px',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  background: 'rgba(255, 255, 255, 0.25)',
});

function ResultItemAnimation({ isVisible, children }: PropsWithChildren<{ isVisible: boolean }>) {
  return (
    <motion.div
      className={css({ position: 'relative' })}
      initial={{ scale: 1 }}
      animate={{
        scale: isVisible ? [1, 1.2, 1] : 1,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    >
      {children}
      {isVisible && (
        <motion.div
          className={flashEffectStyle}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
}
