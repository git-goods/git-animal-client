/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { GithubIcon } from '@gitanimals/ui-icon';
import { ChevronRightIcon } from 'lucide-react';

import { getServerAuth } from '@/auth';
import { AdaptiveLink } from '@/components/AdaptiveLink';
import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';
import { Link } from '@/i18n/routing';
import { checkIdDevAccessPossible } from '@/utils/dev';

import { LoginButton, LogoutButton } from '../AuthButton';

import { Notification } from './Notification/Notification';
import { DesktopLanguageSelector } from './LanguageSelector';
import type { NavMenu } from './menu.constants';
import { LOGIN_NAV_MENU_LIST, NON_LOGIN_NAV_MENU_LIST } from './menu.constants';

export async function DesktopGNB() {
  const session = await getServerAuth();

  const isLogin = Boolean(session);

  return (
    <>
      <header className="fixed top-0 z-header flex h-[60px] w-full items-center justify-between bg-white px-[20px] shadow-[0_1px_4px_0_rgba(0,0,0,0.1)] mobile:hidden">
        <Link href="/">
          <Image src="/main/gnb_right_logo.svg" width={154} height={42} alt="logo" />
        </Link>
        <div className="flex items-center">
          <ul className="glyph16-regular flex items-center gap-[32px] uppercase">
            {isLogin && LOGIN_NAV_MENU_LIST.map((item) => <NavMenuItem key={item.label} item={item} />)}
            {NON_LOGIN_NAV_MENU_LIST.map((item) => (
              <NavMenuItem key={item.label} item={item} />
            ))}
            <DevMenu />
            <li>{isLogin ? <LogoutButton /> : <LoginButton />}</li>
          </ul>
          {session && (
            <Link href="/mypage" className="flex items-center pl-[32px]">
              <>
                <div className="h-[45px] w-[45px] overflow-hidden rounded-full bg-white">
                  <img
                    src={session.user.image}
                    alt="profile"
                    width={160}
                    height={160}
                    className="h-full w-full"
                  />
                </div>
                <button className="flex items-center justify-center">
                  <span className="glyph16-regular ml-[12px] mr-[4px] text-black-75">
                    {session.user.name}
                  </span>
                  <ChevronRightIcon size={16} color="#000" />
                </button>
              </>
            </Link>
          )}
          <div className="mx-[32px] flex items-center gap-[32px] [&>*]:h-[24px]">
            {isLogin && <Notification />}
            <DesktopLanguageSelector />
            <a href={GIT_ANIMALS_MAIN_URL} target="_blank">
              <GithubIcon width={24} height={24} color="#000" fillOpacity={0.75} />
            </a>
          </div>
        </div>
      </header>
      <div className="h-[60px]" />
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
