import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { Button } from '@gitanimals/ui-panda';

import { getServerAuth } from '@/auth';
import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';
import { checkIdDevAccessPossible } from '@/utils/dev';

import LogoutButton from '../LogoutButton';

import LanguageSelector from './LanguageSelector';
import LoginBtn from './LoginBtn';

async function Header() {
  // const locale = await getLocale();
  const t = await getTranslations('Layout');

  // const t = useTranslations('Layout');
  const session = await getServerAuth();

  const isLogin = Boolean(session);

  const isDevAccessPossible = checkIdDevAccessPossible(session?.user.name ?? '');

  return (
    <>
      <header className={headerStyle}>
        <Link href="/">
          <Image src="/main/gnb_right_logo.svg" width={154} height={42} alt="logo" />
        </Link>
        <div>
          <ul className={navStyle}>
            <li>
              <LanguageSelector />
            </li>

            {isLogin && (
              <>
                <li>
                  <Link href="/mypage">{t('mypage')}</Link>
                </li>
                <li>
                  <Link href="/shop">{t('auction')}</Link>
                </li>
              </>
            )}

            <li>
              <a target="_blank" href={GIT_ANIMALS_MAIN_URL}>
                GITHUB
              </a>
            </li>
            {/* <DevMenu /> */}
            {isDevAccessPossible && (
              <li>
                <Link href="/dev">DEV</Link>
              </li>
            )}
            {isLogin ? (
              <li>
                <LogoutButton>
                  <Button>{t('logout')}</Button>
                </LogoutButton>
              </li>
            ) : (
              <li>
                <LoginBtn />
              </li>
            )}
          </ul>
        </div>
      </header>
      <div className={headerBlockStyle} />
    </>
  );
}
export default Header;

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
});
