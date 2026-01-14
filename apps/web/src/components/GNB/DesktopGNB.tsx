/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { GithubIcon } from '@gitanimals/ui-icon';
import { cn } from '@gitanimals/ui-tailwind/utils';
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
      <header
        className={cn(
          'flex justify-between items-center z-header fixed px-5 top-0 h-[60px] w-full bg-white',
          'shadow-[0_1px_4px_0_rgba(0,0,0,0.1)]',
          'max-mobile:hidden'
        )}
      >
        <Link href="/">
          <Image src="/main/gnb_right_logo.svg" width={154} height={42} alt="logo" />
        </Link>
        <div className="flex items-center">
          <ul className="flex gap-8 items-center uppercase font-product text-glyph-16">
            {isLogin && LOGIN_NAV_MENU_LIST.map((item) => <NavMenuItem key={item.label} item={item} />)}
            {NON_LOGIN_NAV_MENU_LIST.map((item) => (
              <NavMenuItem key={item.label} item={item} />
            ))}
            <DevMenu />
            <li>{isLogin ? <LogoutButton /> : <LoginButton />}</li>
          </ul>
          {session && (
            <Link
              href="/mypage"
              className={cn(
                'pl-8 flex items-center',
                '[&_.profile-image]:w-[45px] [&_.profile-image]:h-[45px] [&_.profile-image]:rounded-full [&_.profile-image]:bg-white [&_.profile-image]:overflow-hidden',
                '[&_.profile-image_img]:w-full [&_.profile-image_img]:h-full',
                '[&_.profile-name]:text-black/75 [&_.profile-name]:font-product [&_.profile-name]:text-glyph-16 [&_.profile-name]:mr-1 [&_.profile-name]:ml-3'
              )}
            >
              <>
                <div className="profile-image">
                  <img src={session.user.image} alt="profile" width={160} height={160} />
                </div>
                <button className="flex items-center justify-center">
                  <span className="profile-name">{session.user.name}</span>
                  <ChevronRightIcon size={16} color="#000" />
                </button>
              </>
            </Link>
          )}
          <div className="flex items-center gap-8 mx-8 [&>*]:h-6">
            <Notification />
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
