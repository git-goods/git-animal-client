/* eslint-disable @next/next/no-img-element */
import type { PropsWithChildren } from 'react';
import React from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import type { Persona } from '@gitanimals/api';
import { motion } from 'framer-motion';

import { getPersonaImage } from '@/utils/image';

const mergePersona = ({ targetPersona, materialPersona }: { targetPersona?: Persona; materialPersona?: Persona }) => {
  if (!targetPersona || !materialPersona) return undefined;

  return {
    ...targetPersona,
    level: targetPersona.level + materialPersona.level,
  };
};

const MergeAnimation = ({ materialPersona, targetPersona }: { materialPersona?: Persona; targetPersona?: Persona }) => {
  const resultPersona = mergePersona({ targetPersona, materialPersona });

  return (
    <div className={containerStyle}>
      <div className={itemContainerStyle}>
        <div className={itemStyle}>{targetPersona ? <MergeItem persona={targetPersona} /> : <MergeEmptyItem />}</div>
        <div className={plusSignStyle}>+</div>
        <div className={itemStyle}>
          {materialPersona ? <MergeItem persona={materialPersona} /> : <MergeEmptyItem />}
        </div>

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
});

const itemContainerStyle = flex({
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
});

const itemStyle = css({
  position: 'relative',
  width: '120px',
  height: '120px',
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

const resultItemStyle = css({
  width: '120px',
  height: '120px',
  // backgroundImage: 'linear-gradient(to bottom right, teal.700, blue.700)',
  borderRadius: '8px',
  padding: '8px',
  position: 'relative',
});

const flashEffectStyle = css({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'white',
  borderRadius: '8px',
});

const loadingContainerStyle = css({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

const spinnerStyle = css({
  width: '32px',
  height: '32px',
  border: '4px solid',
  borderColor: 'blue.500',
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
});

export default MergeAnimation;

function MergeMaterialItemAnimation({ children }: PropsWithChildren<{ persona?: Persona }>) {
  return (
    <motion.div className={itemStyle} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  );
}

function MergeEmptyItem() {
  return (
    <>
      <img src="/mypage/merge/merge-empty.svg" alt="empty" className={imageStyle} />
      <div className={levelTextStyle}>Level ?</div>
    </>
  );
}

function MergeItem({ persona }: PropsWithChildren<{ persona: Persona }>) {
  return (
    <>
      <div className={mergeItemStyle}>
        <img src={getPersonaImage(persona.type)} alt="Level 3 Fish" className={imageStyle} />
      </div>
      <div className={levelTextStyle}>Level {persona.level}</div>
    </>
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
      className={resultItemStyle}
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
