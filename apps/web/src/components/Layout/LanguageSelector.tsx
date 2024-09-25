'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { RadioButtonOff, RadioButtonOn } from '@gitanimals/ui-icon';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Globe } from 'lucide-react';

import { Link, type Locale, usePathname } from '@/i18n/routing';

const LOCALE_MAP: Record<Locale, string> = {
  en_US: 'English',
  ko_KR: '한국어',
};

export const DesktopLanguageSelector = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={containerStyles}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Globe size={24} color="#000000BF" />
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
                <motion.button key={lang} onClick={() => setIsOpen(false)} className="option">
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

const containerStyles = css({
  position: 'relative',
  display: 'inline-block',
});

const dropdownStyles = css({
  position: 'absolute',
  right: '-40px',
  mt: '4px',
  bg: 'white',
  borderRadius: '6px',
  overflow: 'hidden',
  minWidth: '100px',
  width: '100%',
  zIndex: 200,
  boxShadow: '0px 3px 5px 2px rgba(0, 0, 0, 0.25)',
  py: '8px',

  '& .option': {
    w: '100%',
    textAlign: 'center',
    px: '16px',
    py: '8px',
    transition: 'background-color 0.2s',
    color: '#000',
    whiteSpace: 'nowrap',
    textStyle: 'glyph16.regular',
    _hover: {
      textDecoration: 'underline',
    },
  },
});

export function MobileLanguageSelector({ onBack }: { onBack: () => void }) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Layout');

  return (
    <article className={languageSelectorContainerStyle}>
      <div className={cx(languageSelectorHeaderStyle)}>
        <button onClick={onBack}>
          <ChevronLeft size={24} color="#9295A1" />
        </button>

        <div className="center-title">{t('language')}</div>
      </div>
      <ul className={languageSelectorListStyle}>
        {Object.keys(LOCALE_MAP).map((lang) => (
          <Link href={pathname} key={lang} locale={lang as Locale}>
            <li key={lang}>
              <div className="label">{LOCALE_MAP[lang as Locale]}</div>
              <div>{locale === lang ? <RadioButtonOn /> : <RadioButtonOff />}</div>
            </li>
          </Link>
        ))}
      </ul>
    </article>
  );
}

const languageSelectorContainerStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#fff',
  maxHeight: '100vh',
  overflowY: 'auto',
  zIndex: 2002,
});

const languageSelectorHeaderStyle = css({
  padding: '0 16px',
  textStyle: 'glyph18.regular',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
  height: 44,

  '& .center-title': {
    width: 'fit-content',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
});

const languageSelectorListStyle = css({
  width: '100%',
  textStyle: 'glyph16.regular',

  '& li': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 22px 18px 20px',

    borderBottom: '1px solid',
    borderColor: 'gray.gray_900',
    backgroundColor: 'white',
  },
});
