/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import type { PropsWithChildren } from 'react';
import { useTranslations } from 'next-intl';
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
      <h3 className="glyph24-bold text-white">{t('merge-result')}</h3>
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

const mergeItemStyle =
  'rounded-[16px] border-2 border-solid border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.25)] w-fit';

const resultTextStyle = 'glyph18-bold text-white [&>span]:mt-[4px]';

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

const containerStyle =
  'absolute top-0 right-0 bottom-0 left-0 w-full h-full flex items-center justify-center bg-black-50 z-50 cursor-pointer';

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

const containerInnerStyle = 'bg-gray-150 relative rounded-[16px] px-[48px] py-[36px]';

const closeButtonStyle = 'absolute top-[8px] right-[8px] p-[2px] rounded-full';

const contentStyle = 'flex flex-col items-center gap-[12px] text-center';

const contentStaggerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.3 } },
};
