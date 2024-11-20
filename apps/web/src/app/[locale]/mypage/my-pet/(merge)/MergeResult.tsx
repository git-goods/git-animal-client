/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import type { PropsWithChildren } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import type { MergePersonaLevelResponse } from '@gitanimals/api';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import { getPersonaImage } from '@/utils/image';

interface MergeResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: MergePersonaLevelResponse;
}

export const MergeResultModal = ({ isOpen, onClose, result }: MergeResultModalProps) => {
  const t = useTranslations('Mypage.Merge');

  if (!isOpen) return null;

  return (
    <MotionContainer onClose={onClose}>
      <h3 className={css({ textStyle: 'glyph24.bold' })}>{t('merge-result')}</h3>
      <div className={mergeItemStyle}>
        <img src={getPersonaImage(result.type)} alt={result.type} width={100} height={100} />
      </div>
      <div className={resultTextStyle}>
        <p>{snakeToTitleCase(result.type)}</p>
        <span>Level {result.level}</span>
      </div>
    </MotionContainer>
  );
};

const mergeItemStyle = css({
  borderRadius: '16px',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  background: 'rgba(255, 255, 255, 0.25)',
  width: 'fit-content',
});

const resultTextStyle = css({
  textStyle: 'glyph18.bold',

  '& > span': {
    marginTop: '4px',
  },
});

function MotionContainer({ children, onClose }: PropsWithChildren<{ onClose: () => void }>) {
  return (
    <AnimatePresence mode="wait">
      <div className={containerStyle} onClick={() => onClose()}>
        <motion.div
          variants={containerInnerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={containerInnerStyle}>
            <button onClick={onClose} className={closeButtonStyle}>
              <X size={20} />
            </button>
            <motion.div variants={contentStaggerVariants} initial="initial" animate="animate" className={contentStyle}>
              {children}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const containerStyle = css({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black.black_50',
  zIndex: 50,
  cursor: 'pointer',
});

const containerInnerVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      duration: 0.7,
      bounce: 0.5,
    },
  },
  exit: { scale: 0, rotate: 180, transition: { duration: 0.5 } },
};

const containerInnerStyle = css({
  backgroundColor: 'gray.gray_150',
  position: 'relative',
  borderRadius: '16px',
  padding: '36px 48px',
});

const closeButtonStyle = css({
  position: 'absolute',
  top: '8px',
  right: '8px',
  padding: '2px',
  borderRadius: 'full',
});

const contentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  textAlign: 'center',
});

const contentStaggerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.3 } },
};
