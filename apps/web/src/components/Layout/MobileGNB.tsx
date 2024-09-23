'use client';
import React, { useState } from 'react';
import { css } from '_panda/css';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const MobileGNB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css({ height: 'fit-content' })}>
      <button onClick={toggleMenu}>
        <Menu size={24} color="black" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={css({
              position: 'fixed',
              left: 0,
              right: 0,
              backgroundColor: '#374151',
              top: '60px',
              maxHeight: 'calc(100vh - 60px)',
              overflowY: 'auto',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              zIndex: 40,
            })}
          >
            <ul className={css({ padding: '16px' })}>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className={css({ marginBottom: '8px' })}
              >
                <a href="#" className={css({ color: '#FFFFFF', display: 'block', padding: '8px 0' })}>
                  홈
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={css({ marginBottom: '8px' })}
              >
                <a href="#" className={css({ color: '#FFFFFF', display: 'block', padding: '8px 0' })}>
                  서비스
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={css({ marginBottom: '8px' })}
              >
                <a href="#" className={css({ color: '#FFFFFF', display: 'block', padding: '8px 0' })}>
                  제품
                </a>
              </motion.li>
              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <a href="#" className={css({ color: '#FFFFFF', display: 'block', padding: '8px 0' })}>
                  연락처
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 페이지 콘텐츠를 위한 여백 */}
      {/* <div className={css({ paddingTop: '60px' })}></div> */}
    </div>
  );
};

export default MobileGNB;
