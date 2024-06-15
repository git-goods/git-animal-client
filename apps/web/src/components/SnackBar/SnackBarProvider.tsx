'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import { useIsMounted } from '@/hooks/useIsMounted';

import { useSnackBar } from './useSnackBar';
import { SnackBar } from '.';

export const SnackBarProvider = () => {
  const isMounted = useIsMounted();
  const { snackBars, removeSnackBar } = useSnackBar();

  if (!isMounted) return null;

  return createPortal(
    <SnackBarContainer>
      <AnimatePresence>
        {snackBars.map((snackBar) => (
          <motion.div
            key={snackBar.id}
            layout
            initial={{ opacity: 0.5, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.5, y: 12 }}
            transition={{ ease: 'easeOut' }}
          >
            <SnackBar onClose={() => removeSnackBar(snackBar.id)} {...snackBar} />
          </motion.div>
        ))}
      </AnimatePresence>
    </SnackBarContainer>,
    document.body,
  );
};

const SnackBarContainer = styled.div`
  position: fixed;
  top: 76px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;
