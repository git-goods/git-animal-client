/* eslint-disable @next/next/no-img-element */
import { GithubIcon } from '@gitanimals/ui-icon';
import { css, cx } from '_panda/css';
import { center, flex } from '_panda/patterns';
import { ChevronRightIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { getServerAuth } from '@/auth';
import { AdaptiveLink } from '@/components/AdaptiveLink';
import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';
import { Link } from '@/i18n/routing';
import { checkIdDevAccessPossible } from '@/utils/dev';

import { LoginButton, LogoutButton } from '../AuthButton';

import { DesktopLanguageSelector } from './LanguageSelector';
import { Notification } from './Notification/Notification';
import type { NavMenu } from './menu.constants';
import { LOGIN_NAV_MENU_LIST, NON_LOGIN_NAV_MENU_LIST } from './menu.constants';

export async function DesktopGNB() {
  const session = await getServerAuth();

  const isLogin = Boolean(session);

  return (
    <>
      <header className={cx(headerBaseStyle, headerStyle)}>
        <Link href="/">
          <Image src="/main/gnb_right_logo.svg" width={154} height={42} alt="logo" />
        </Link>
        <div className={flex({ alignItems: 'center' })}>
          <ul className={navStyle}>
            {isLogin && LOGIN_NAV_MENU_LIST.map((item) => <NavMenuItem key={item.label} item={item} />)}
            {NON_LOGIN_NAV_MENU_LIST.map((item) => (
              <NavMenuItem key={item.label} item={item} />
            ))}
            <DevMenu />
            <li>{isLogin ? <LogoutButton /> : <LoginButton />}</li>
          </ul>
          {session && (
            <Link href="/mypage" className={profileStyle}>
              <>
                <div className="profile-image">
                  <img src={session.user.image} alt="profile" width={160} height={160} />
                </div>
                <button className={center()}>
                  <span className="profile-name">{session.user.name}</span>
                  <ChevronRightIcon size={16} color="#000" />
                </button>
              </>
            </Link>
          )}
          <div className={iconWrapperStyle}>
            <Notification />
            <DesktopLanguageSelector />
            <a href={GIT_ANIMALS_MAIN_URL} target="_blank">
              <GithubIcon width={24} height={24} color="#000" fillOpacity={0.75} />
            </a>
          </div>
        </div>
      </header>
      <div className={headerBlockStyle} />
    </>
  );
}

async function NavMenuItem({ item }: { item: NavMenu }) {
  const t = await getTranslations('Layout');
  return (
    <li>
      <AdaptiveLink href={item.href}>{t(item.label)}</AdaptiveLink>
    </li>
  );
}

const headerBaseStyle = flex({
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 'header',
  position: 'fixed',
  padding: '0 20px',
  top: 0,
  height: '60px',
  width: '100%',
  backgroundColor: 'white',
});

const iconWrapperStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
  margin: '0 32px',

  '& > *': {
    height: '24px',
  },
});

async function DevMenu() {
  const session = await getServerAuth();

  const isDevAccessPossible = checkIdDevAccessPossible(session?.user.name ?? '');

  if (!isDevAccessPossible) return null;

  return (
    <li>
      <Link href="/dev">DEV</Link>
    </li>
  );
}

const headerStyle = flex({
  backgroundColor: 'white',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
  width: '100%',
  _mobile: {
    display: 'none',
  },
});

const headerBlockStyle = css({
  height: '60px',
});

const navStyle = flex({
  textStyle: 'glyph16.regular',
  gap: '32px',
  alignItems: 'center',
  textTransform: 'uppercase',
});

const profileStyle = css({
  pl: '32px',
  display: 'flex',
  alignItems: 'center',
  '& .profile-image': {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  '& .profile-name': {
    color: 'black.black_75',
    textStyle: 'glyph16.regular',
    marginRight: '4px',
    marginLeft: '12px',
  },
});
