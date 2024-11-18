/* eslint-disable @next/next/no-img-element */
'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import type { Transition, Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Globe, LogOutIcon, Menu } from 'lucide-react';

import { AdaptiveLink } from '@/components/AdaptiveLink';
import { RenderLoginButton, RenderLogoutButton } from '@/components/AuthButton';
import { Link } from '@/i18n/routing';
import { useClientSession } from '@/utils/clientAuth';

import { MobileLanguageSelector } from './LanguageSelector';
import { LOGIN_NAV_MENU_LIST, NON_LOGIN_NAV_MENU_LIST } from './menu.constants';

export const MobileGNB = () => {
  const t = useTranslations('Layout');

  const { status, data } = useClientSession();
  const isAuth = status === 'authenticated';

  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

  const menuList = isAuth ? [...LOGIN_NAV_MENU_LIST, ...NON_LOGIN_NAV_MENU_LIST] : NON_LOGIN_NAV_MENU_LIST;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className={mobileHeaderStyle}>
        <div className={mobileHeaderContentStyle}>
          <button onClick={toggleMenu}>
            <Menu size={24} color="black" />
          </button>

          <Link href="/" className="center-title">
            <Image src="/main/gnb_right_logo.svg" alt="gitanimals-logo" width={80} height={22} />
          </Link>

          {isAuth && (
            <Link href="/mypage">
              <div className="profile-image">
                <img src={data.user.image} alt="profile" width={28} height={28} />
              </div>
            </Link>
          )}
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
            <ul className="menu-list">
              {menuList.map((menu) => (
                <AdaptiveLink href={menu.href} key={menu.label}>
                  <MenuItem {...menu} label={t(menu.label)} />
                </AdaptiveLink>
              ))}
              <button onClick={() => setIsLanguageSelectorOpen(true)}>
                <MenuItem icon={<Globe size={20} color="#9295A1" />} label={t('language')} />
              </button>
              {isAuth ? (
                <RenderLogoutButton
                  render={(props) => (
                    <button onClick={props.onClick}>
                      <MenuItem icon={<LogOutIcon size={20} color="#9295A1" />} label={props.label} />
                    </button>
                  )}
                />
              ) : (
                <RenderLoginButton
                  render={(props) => (
                    <button onClick={props.onClick}>
                      <MenuItem icon={<LogOutIcon size={20} color="#9295A1" />} label={props.label} />
                    </button>
                  )}
                />
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {isLanguageSelectorOpen && <MobileLanguageSelector onBack={() => setIsLanguageSelectorOpen(false)} />}
    </>
  );
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

const mobileHeaderContentStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
  height: 44,
  '& .center-title': { width: 'fit-content', position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
  '& .profile-image': {
    width: 28,
    height: 28,
    borderRadius: '50%',
    overflow: 'hidden',
  },
});

const mobileHeaderStyle = css({
  // common
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 2000,
  position: 'fixed',
  padding: '0 20px',
  top: 0,
  height: 60,
  backgroundColor: 'white',

  // mobile
  width: '100vw',
  display: 'none',
  _mobile: {
    display: 'flex',
  },
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
  zIndex: 1999,

  _mobile: {
    display: 'flex',
  },

  '& .menu-list': {
    width: '100%',
    '& >  *': {
      width: '100%',
    },
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
