import { cn } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { GamepadIcon, HouseIcon, StoreIcon, UserRoundIcon } from 'lucide-react';

import { Link, usePathname } from '@/i18n/routing';

const TAB_LIST = [
  {
    label: 'HOME',
    Icon: HouseIcon,
    href: '/',
  },
  {
    label: 'Shop',
    Icon: StoreIcon,
    href: '/shop',
  },
  {
    label: 'Game',
    Icon: GamepadIcon,
    href: '/game',
  },
  {
    label: 'Mypage',
    Icon: UserRoundIcon,
    href: '/mypage',
  },
];

const isActiveTab = (pathname: string, href: string) => {
  if (href === '/') {
    return pathname === href;
  }
  return pathname.startsWith(href);
};

export const TabBar = wrap.Suspense().on(() => {
  const pathname = usePathname();

  return (
    <div className={tabBarStyle}>
      {TAB_LIST.map((tab) => (
        <Link
          key={tab.label}
          href={tab.href}
          className={cn(tabBarLinkStyle, isActiveTab(pathname, tab.href) ? 'text-white' : '')}
        >
          <tab.Icon />
          <span>{tab.label}</span>
        </Link>
      ))}
    </div>
  );
});

const tabBarStyle =
  'grid grid-cols-[repeat(4,_1fr)] gap-[18px] pt-3 pb-1 px-10 fixed bottom-0 left-0 right-0 z-[100] bg-[#212429] rounded-t-[16px] w-full max-w-[var(--container-max-width)] mx-auto';

const tabBarLinkStyle = 'flex flex-col items-center justify-center gap-[2px] text-white-25 glyph12-regular';
