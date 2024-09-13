'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe } from 'lucide-react';

import { Link, type Locale, usePathname } from '@/i18n/routing';

const LOCALE_MAP: Record<Locale, string> = {
  en_US: 'English',
  ko_KR: '한국어',
};

const LanguageSelector = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={containerStyles}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Globe size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={dropdownStyles}
          >
            {Object.keys(LOCALE_MAP).map((lang) => (
              <Link href={pathname} key={lang} locale={lang as Locale} passHref>
                <motion.button key={lang} onClick={() => setIsOpen(false)} className={optionStyles}>
                  {LOCALE_MAP[lang as Locale]}
                </motion.button>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;

const containerStyles = css({
  position: 'relative',
  display: 'inline-block',
});

const dropdownStyles = css({
  position: 'absolute',
  right: '0',
  left: '0',
  mt: '4px',
  bg: 'white',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
  minWidth: 'fit-content',
  width: '100%',
  zIndex: 200,
});

const optionStyles = css({
  w: '100%',
  textAlign: 'left',
  px: '16px',
  py: '8px',
  transition: 'background-color 0.2s',
  color: '#000',
  whiteSpace: 'nowrap',
  _hover: {
    textDecoration: 'underline',
  },
});
