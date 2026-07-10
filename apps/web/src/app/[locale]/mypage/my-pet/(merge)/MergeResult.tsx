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

import {
  closeButtonStyle,
  containerInnerStyle,
  containerInnerVariants,
  containerStyle,
  contentStaggerVariants,
  contentStyle,
} from '../_components/resultModal.shared';

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
