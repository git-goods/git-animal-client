/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
import type { PropsWithChildren } from 'react';
import { useTranslations } from 'next-intl';
import type { MergePersonaLevelResponse } from '@gitanimals/api';
import { cn } from '@gitanimals/ui-tailwind/utils';
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
      <h3 className="font-product-bold text-glyph-24 text-white">{t('merge-result')}</h3>
      <div className="rounded-2xl border-2 border-white/25 bg-white/25 w-fit">
        <img src={getPersonaImage(result.type)} alt={result.type} width={100} height={100} />
      </div>
      <div className="font-product-bold text-glyph-18 text-white text-center [&>span]:mt-1">
        <p>{snakeToTitleCase(result.type)}</p>
        <span>Level {result.level}</span>
      </div>
    </MotionContainer>
  );
};

function MotionContainer({ children, onClose }: PropsWithChildren<{ onClose: () => void }>) {
  return (
    <AnimatePresence mode="wait">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50 cursor-pointer"
        onClick={() => onClose()}
      >
        <motion.div
          variants={containerInnerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gray-150 relative rounded-2xl py-9 px-12">
            <button onClick={onClose} className="absolute top-2 right-2 p-0.5 rounded-full">
              <X size={20} />
            </button>
            <motion.div
              variants={contentStaggerVariants}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center gap-3 text-center"
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

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

const contentStaggerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.3 } },
};
