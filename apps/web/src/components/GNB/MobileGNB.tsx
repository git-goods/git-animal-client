/* eslint-disable @next/next/no-img-element */
'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
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
      <div className="h-[60px]" />
      <header
        className={cn(
          'justify-between items-center z-header fixed px-5 top-0 h-[60px] bg-white',
          'w-screen hidden max-mobile:flex'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between relative w-full h-11',
            '[&_.center-title]:w-fit [&_.center-title]:absolute [&_.center-title]:left-1/2 [&_.center-title]:-translate-x-1/2',
            '[&_.profile-image]:w-7 [&_.profile-image]:h-7 [&_.profile-image]:rounded-full [&_.profile-image]:overflow-hidden'
          )}
        >
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
            className={cn(
              'fixed left-0 right-0 bg-white top-[60px] max-h-[calc(100vh-60px)] overflow-y-auto',
              'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] z-drawer',
              'max-mobile:flex',
              '[&_.menu-list]:w-full [&_.menu-list>*]:w-full'
            )}
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
    <motion.li
      className={cn(
        'flex justify-between font-product text-glyph-16 capitalize text-black/75',
        'py-[18px] pr-[22px] pl-5 border-b border-gray-900',
        '[&_div]:flex [&_div]:items-center [&_div]:gap-2.5'
      )}
    >
      <div>
        {icon}
        <p>{label}</p>
      </div>
      {isArrow && <ChevronRight size={20} color="#9295A1" />}
    </motion.li>
  );
}

const menuVariant: Variants = {
  initial: { opacity: 1, y: '-100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: '-100%' },
};

const menuTransition: Transition = { duration: 0.3, ease: 'easeInOut' };
