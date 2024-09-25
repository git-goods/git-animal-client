'use client';
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { RadioButtonOff, RadioButtonOn } from '@gitanimals/ui-icon';
import type { Transition, Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Globe, LogInIcon, LogOutIcon, Menu } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { Link, usePathname } from '@/i18n/routing';
import { useClientSession } from '@/utils/clientAuth';

import { LOGIN_NAV_MENU_LIST, NON_LOGIN_NAV_MENU_LIST } from './menu.constants';

export const MobileGNB = () => {
  const t = useTranslations('Layout');

  const { status } = useClientSession();
  const isAuth = status === 'authenticated';

  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className={cx(headerBaseStyle, mobileHeaderStyle)}>
        <div className={mobileHeaderContentStyle}>
          <button onClick={toggleMenu}>
            <Menu size={24} color="black" />
          </button>

          <Link href="/" className={mobileLogoStyle}>
            <Image src="/main/gnb_right_logo.svg" alt="gitanimals-logo" width={80} height={22} />
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={menuVariant}
            transition={menuTransition}
            className={mobileMenuStyle}
          >
            <ul className={mobileMenuListStyle}>
              {isAuth &&
                LOGIN_NAV_MENU_LIST.map((menu) => (
                  <AdaptiveLink href={menu.href} key={menu.label}>
                    <MenuItem {...menu} label={t(menu.label)} />
                  </AdaptiveLink>
                ))}
              {NON_LOGIN_NAV_MENU_LIST.map((menu) => (
                <AdaptiveLink href={menu.href} key={menu.label}>
                  <MenuItem {...menu} label={t(menu.label)} />
                </AdaptiveLink>
              ))}
              <button onClick={() => setIsLanguageSelectorOpen(true)}>
                <MenuItem icon={<Globe size={20} color="#9295A1" />} label="Language" />
              </button>
              <button>
                {isAuth ? (
                  <MenuItem icon={<LogOutIcon size={20} color="#9295A1" />} label="Logout" />
                ) : (
                  <MenuItem icon={<LogInIcon size={20} color="#9295A1" />} label="Login" />
                )}
              </button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {isLanguageSelectorOpen && <LanguageSelector onBack={() => setIsLanguageSelectorOpen(false)} />}
    </>
  );
};

const AdaptiveLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  if (isExternalLink(href)) {
    return <a href={href}>{children}</a>;
  }
  return <Link href={href}>{children}</Link>;
};

function MenuItem({ icon, label, isArrow = true }: { icon: ReactNode; label: string; isArrow?: boolean }) {
  return (
    <motion.li className={menuItemStyle}>
      <div>
        {icon}
        <p>{label}</p>
      </div>
      {isArrow && <ChevronRight size={20} color="#9295A1" />}
    </motion.li>
  );
}

// TODO : LanguageSelector 공통화
const LOCALE_MAP: Record<Locale, string> = {
  en_US: 'English',
  ko_KR: '한국어',
};

function LanguageSelector({ onBack }: { onBack: () => void }) {
  const pathname = usePathname();
  const locale = useLocale();
  return (
    <article className={languageSelectorContainerStyle}>
      <div className={cx(mobileHeaderContentStyle, languageSelectorHeaderStyle)}>
        <button onClick={onBack}>
          <ChevronLeft size={24} color="#9295A1" />
        </button>

        <div className={mobileLogoStyle}>Language</div>
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

const languageSelectorContainerStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#fff',
  maxHeight: '100vh',
  overflowY: 'auto',
  zIndex: 101,
});

const languageSelectorHeaderStyle = css({
  padding: '0 16px',
  textStyle: 'glyph18.regular',
});

const headerBaseStyle = flex({
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 100,
  position: 'fixed',
  padding: '0 20px',
  top: 0,
  height: 60,
  width: '100%',
  backgroundColor: 'white',
});

const mobileHeaderStyle = css({
  width: '100vw',

  display: 'none',
  _mobile: {
    display: 'flex',
  },
});

const mobileHeaderContentStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
  height: 44,
});

const mobileLogoStyle = css({
  // width: '80px',
  width: 'fit-content',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});

const mobileMenuStyle = css({
  position: 'fixed',
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  top: '60px',
  maxHeight: 'calc(100vh - 60px)',
  overflowY: 'auto',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  zIndex: 99,

  _mobile: {
    display: 'flex',
  },
});

const mobileMenuListStyle = css({
  width: '100%',
  '& >  *': {
    width: '100%',
  },
});

const menuItemStyle = flex({
  justifyContent: 'space-between',
  textStyle: 'glyph16.regular',
  textTransform: 'capitalize',
  color: 'black.black_75',
  padding: '18px 22px 18px 20px',
  borderBottom: '1px solid',
  borderColor: 'gray.gray_900',

  '& div': {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
});

const menuVariant: Variants = {
  initial: { opacity: 1, y: '-100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: '-100%' },
};

const menuTransition: Transition = { duration: 0.3, ease: 'easeInOut' };
