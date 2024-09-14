import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';

import { getServerAuth } from '@/auth';
import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';
import { checkIdDevAccessPossible } from '@/utils/dev';

import { LoginOutBtn } from './LoginBtn';

interface NavMenu {
  label: string;
  href: string;
  isExternal?: boolean;
}

const LOGIN_NAV_MENU_LIST: NavMenu[] = [
  {
    label: 'mypage',
    href: '/mypage',
  },
  {
    label: 'auction',
    href: '/shop',
  },
  {
    label: 'GITHUB',
    href: GIT_ANIMALS_MAIN_URL,
    isExternal: true,
  },
  {
    label: 'DEV',
    href: '/dev',
  },
] as const;

const NON_LOGIN_NAV_MENU_LIST: NavMenu[] = [
  {
    label: 'GITHUB',
    href: GIT_ANIMALS_MAIN_URL,
    isExternal: true,
  },
] as const;

async function GNB() {
  return <GNBDesktop />;
}

export default GNB;

const renderNavMenuList = async (list: NavMenu[]) => {
  const t = await getTranslations('Layout');

  return list.map((item) => {
    return (
      <li key={item.label}>
        {item.isExternal ? (
          <a target="_blank" href={item.href}>
            {t(item.label)}
          </a>
        ) : (
          <Link href={item.href}>{t(item.label)}</Link>
        )}
      </li>
    );
  });
};

async function GNBDesktop() {
  const session = await getServerAuth();

  const isLogin = Boolean(session);

  return (
    <>
      <header className={headerStyle}>
        <Link href="/">
          <Image src="/main/gnb_right_logo.svg" width={154} height={42} alt="logo" />
        </Link>
        <div>
          <ul className={navStyle}>
            {/* TODO : 다국어 지원 추가 */}
            {/* <li>
                <LanguageSelector />
              </li> */}
            {renderNavMenuList(isLogin ? LOGIN_NAV_MENU_LIST : NON_LOGIN_NAV_MENU_LIST)}
            <DevMenu />
            <LoginOutBtn />
          </ul>
        </div>
      </header>
      <div className={headerBlockStyle} />
    </>
  );
}

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
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  height: 60,
  backgroundColor: 'white',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
  zIndex: 100,
  position: 'fixed',
  top: 0,
  width: '100%',
});

const headerBlockStyle = css({
  height: 60,
});

const navStyle = flex({
  textStyle: 'glyph16.regular',
  gap: '32px',
  alignItems: 'center',
  textTransform: 'uppercase',
});
