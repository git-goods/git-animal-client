import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { Menu } from 'lucide-react';

import { getServerAuth } from '@/auth';
import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';
import { checkIdDevAccessPossible } from '@/utils/dev';

import { LoginOutBtn } from './LoginOutBtn';

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
    label: 'github',
    href: GIT_ANIMALS_MAIN_URL,
    isExternal: true,
  },
] as const;

const NON_LOGIN_NAV_MENU_LIST: NavMenu[] = [
  {
    label: 'github',
    href: GIT_ANIMALS_MAIN_URL,
    isExternal: true,
  },
] as const;

async function GNB() {
  // return <GNBMobile />;
  // return <GNBDesktop />;
  return (
    <>
      <GNBMobile />
      <GNBDesktop />
    </>
  );
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
      <header className={cx(headerBaseStyle, headerStyle)}>
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

async function GNBMobile() {
  return (
    <>
      <header className={cx(headerBaseStyle, mobileHeaderStyle)}>
        <div className={mobileHeaderContentStyle}>
          <Menu />

          {/* <div>Sing in</div> */}
          <div className={mobileLogoStyle}>
            <Image src="/main/gnb_right_logo.svg" alt="gitanimals-logo" width={80} height={22} />
          </div>
        </div>
      </header>
    </>
  );
}

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
  borderBottom: '1px solid',
  borderColor: 'gray.gray__300',

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
  width: 'calc(100vw - 40px)',
});

const mobileLogoStyle = css({
  width: '80px',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
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
  height: 60,
});

const navStyle = flex({
  textStyle: 'glyph16.regular',
  gap: '32px',
  alignItems: 'center',
  textTransform: 'uppercase',
});