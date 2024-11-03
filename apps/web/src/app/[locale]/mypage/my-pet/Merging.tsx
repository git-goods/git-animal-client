/* eslint-disable @next/next/no-img-element */
import type { PropsWithChildren } from 'react';
import React, { useState } from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { AnimatePresence, AnimatePresence, motion } from 'framer-motion';

const MergeAnimation = () => {
  const [isMerging, setIsMerging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

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
          <motion.div
            className={itemStyle}
            animate={{
              opacity: isMerging && !isLoading ? 0.5 : 1,
              filter: isMerging && !isLoading ? 'grayscale(1)' : 'grayscale(0)',
            }}
            transition={{ duration: 0.5 }}
          >
            <img src="https://placehold.co/96x96" alt="Level 1 Cat" className={imageStyle} />
            <div className={levelTextStyle}>Level 1</div>
          </motion.div>

          {/* First Item Clone */}
          <CloneItem isVisible={isMerging && !isLoading && !showResult} position="left">
            <div className={itemStyle}>
              <img src="https://placehold.co/96x96" alt="Level 1 Clone" className={imageStyle} />
            </div>
          </CloneItem>
        </div>

        {/* Plus Sign */}
        <motion.div
          className={plusSignStyle}
          animate={{ opacity: isMerging && !isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.div>

        {/* Second Item */}
        <div className={itemWrapperStyle}>
          <motion.div
            className={itemStyle}
            animate={{
              opacity: isMerging && !isLoading ? 0.5 : 1,
              filter: isMerging && !isLoading ? 'grayscale(1)' : 'grayscale(0)',
            }}
            transition={{ duration: 0.5 }}
          >
            <img src="https://placehold.co/96x96" alt="Level 3 Fish" className={imageStyle} />
            <div className={levelTextStyle}>Level 3</div>
          </motion.div>

          {/* Second Item Clone */}
          <CloneItem isVisible={isMerging && !isLoading && !showResult} position="right">
            <div className={itemStyle}>
              <img src="https://placehold.co/96x96" alt="Level 3 Clone" className={imageStyle} />
            </div>
          </CloneItem>
        </div>

        {/* Arrow */}
        <div className={arrowStyle}>=</div>

        {/* Result Item */}
        <motion.div
          className={resultItemStyle}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: showResult ? 1 : 0,
            scale: showResult ? 1 : 0.7,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          <img src="https://placehold.co/96x96" alt="Level 4 Result" className={imageStyle} />
          <div className={levelTextStyle}>Level 4</div>

          {/* Result Flash Effect */}
          {showResult && (
            <motion.div
              className={flashEffectStyle}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </motion.div>
      </div>

      {/* Impact Lines */}
      {isMerging && !isLoading && (
        <div className={impactLinesContainerStyle}>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`impact-${i}`}
              className={impactLineStyle}
              style={{
                rotate: `${i * 45}deg`,
                left: '50%',
                top: '50%',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

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
      <motion.button
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
      )}
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
  width: '96px',
  height: '96px',
  backgroundColor: 'gray.700',
  borderRadius: '8px',
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
  width: '96px',
  height: '96px',
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
  width: '96px',
  height: '96px',
  backgroundImage: 'linear-gradient(to bottom right, teal.700, blue.700)',
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

const impactLinesContainerStyle = css({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

const impactLineStyle = css({
  position: 'absolute',
  height: '2px',
  backgroundColor: 'orange.400',
  transformOrigin: 'left',
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

function CloneItem({
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
