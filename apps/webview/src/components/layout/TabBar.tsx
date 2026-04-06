import { wrap } from '@suspensive/react';
import { GamepadIcon, HouseIcon, StoreIcon, UserRoundIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@gitanimals/ui-tailwind/utils';

// import { Link, usePathname } from '@/i18n/routing';

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
  // const pathname = usePathname();
  const pathname = '/';

  return (
    <div
      className={cn(
        'grid w-full max-w-[var(--container-max-width)] grid-cols-4 gap-[18px] px-10 pb-1 pt-3',
        'fixed bottom-0 left-0 right-0 z-[100] mx-auto h-[var(--tab-bar-height)]',
        'rounded-t-2xl bg-[#212429]',
      )}
    >
      {TAB_LIST.map((tab) => (
        <Link
          key={tab.label}
          to={tab.href}
          className={cn(
            'flex flex-col items-center justify-center gap-0.5 font-product text-glyph-12 text-white/25',
            isActiveTab(pathname, tab.href) && 'text-white',
          )}
        >
          <tab.Icon />
          <span>{tab.label}</span>
        </Link>
      ))}
    </div>
  );
});
