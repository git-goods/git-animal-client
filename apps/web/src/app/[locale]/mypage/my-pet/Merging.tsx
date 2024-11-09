/* eslint-disable @next/next/no-img-element */
import type { PropsWithChildren } from 'react';
import React, { useState } from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import type { Persona } from '@gitanimals/api';
import { AnimatePresence, motion } from 'framer-motion';

import { getPersonaImage } from '@/utils/image';

const mergePersona = ({ targetPersona, materialPersona }: { targetPersona?: Persona; materialPersona?: Persona }) => {
  if (!targetPersona || !materialPersona) return undefined;

  return {
    ...targetPersona,
    level: targetPersona.level + materialPersona.level,
  };
};

const MergeAnimation = ({ materialPersona, targetPersona }: { materialPersona?: Persona; targetPersona?: Persona }) => {
  const [isMerging, setIsMerging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const resultPersona = mergePersona({ targetPersona, materialPersona });

  const handleMerge = async () => {
    setIsMerging(true);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      startMergeAnimation();
    } catch (error) {
      setIsMerging(false);
      setIsLoading(false);
    }
  };

  const startMergeAnimation = () => {
    setTimeout(() => {
      setShowResult(true);
    }, 300);
  };

  const handleReset = () => {
    setIsMerging(false);
    setIsLoading(false);
    setShowResult(false);
  };

  return (
    <div className={containerStyle}>
      <div className={itemContainerStyle}>
        {/* First Item */}
        <div className={itemWrapperStyle}>
          <MergeMaterialItemAnimation
            isMerged={isMerging && !isLoading}
            persona={targetPersona}
            key={targetPersona?.id}
          >
            {targetPersona ? <MergeItem persona={targetPersona} /> : <MergeEmptyItem />}
          </MergeMaterialItemAnimation>

          {/* <CloneItemAnimation isVisible={isMerging && !isLoading && !showResult} position="left">
            {targetPersona ? <MergeItem persona={targetPersona} /> : <MergeEmptyItem />}
          </CloneItemAnimation> */}
        </div>

        <div className={plusSignStyle}>+</div>

        <div className={itemWrapperStyle}>
          <MergeMaterialItemAnimation
            isMerged={isMerging && !isLoading}
            persona={materialPersona}
            key={materialPersona?.id}
          >
            {materialPersona ? <MergeItem persona={materialPersona} /> : <MergeEmptyItem />}
          </MergeMaterialItemAnimation>
        </div>

        <div className={arrowStyle}>=</div>

        <ResultItemAnimation isVisible={Boolean(resultPersona)} key={resultPersona?.id}>
          {resultPersona ? <MergeItem persona={resultPersona} /> : <MergeEmptyItem />}
        </ResultItemAnimation>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <motion.div
          className={loadingContainerStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={spinnerStyle} />
        </motion.div>
      )}

      {/* Buttons */}
      {/* <motion.button
        onClick={handleMerge}
        disabled={isMerging || isLoading}
        className={mergeButtonStyle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          opacity: isMerging || isLoading ? 0.5 : 1,
          cursor: isMerging || isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? 'Merging...' : 'Merge'}
      </motion.button>

      {showResult && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleReset}
          className={resetButtonStyle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
      )} */}
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

const itemWrapperStyle = css({
  position: 'relative',
});

const itemStyle = css({
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

const cloneWrapperStyle = css({
  width: '120px',
  height: '120px',
  position: 'absolute',
  top: 0,
  left: 0,
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

const mergeButtonStyle = css({
  marginTop: '32px',
  paddingX: '24px',
  paddingY: '8px',
  backgroundColor: 'blue.500',
  color: 'white',
  borderRadius: '9999px',
  '&:hover': {
    backgroundColor: 'blue.600',
  },
  transition: 'all 0.3s',
  marginX: 'auto',
  display: 'block',
});

const resetButtonStyle = css({
  marginTop: '16px',
  paddingX: '24px',
  paddingY: '8px',
  backgroundColor: 'gray.500',
  color: 'white',
  borderRadius: '9999px',
  '&:hover': {
    backgroundColor: 'gray.600',
  },
  transition: 'all 0.3s',
  marginX: 'auto',
  display: 'block',
});

export default MergeAnimation;

function CloneItemAnimation({
  isVisible,
  children,
  position,
}: PropsWithChildren<{ isVisible: boolean; position: 'left' | 'right' }>) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={cloneWrapperStyle}
          initial={{ opacity: 1, x: 0, rotate: -10, scale: 1 }}
          animate={{
            x: position === 'left' ? 60 : -60,
            rotate: 0,
            scale: 1.1,
            transition: { duration: 0.4, ease: 'easeInOut' },
          }}
          exit={{
            x: position === 'left' ? 80 : -80,
            rotate: position === 'left' ? -10 : 10,
            scale: 1,
            opacity: 0,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MergeMaterialItemAnimation({
  isMerged,
  children,
}: PropsWithChildren<{ isMerged: boolean; persona?: Persona }>) {
  return (
    <motion.div
      className={itemStyle}
      animate={{
        opacity: isMerged ? 0.5 : 1,
        filter: isMerged ? 'grayscale(1)' : 'grayscale(0)',
      }}
      transition={{ duration: 0.5 }}
    >
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
