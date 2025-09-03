import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { wrap } from '@suspensive/react';
import { GamepadIcon, HouseIcon, StoreIcon, UserRoundIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className={tabBarStyle}>
      {TAB_LIST.map((tab) => (
        <Link
          key={tab.label}
          to={tab.href}
          className={cx(tabBarLinkStyle, isActiveTab(pathname, tab.href) ? css({ color: 'white' }) : css({}))}
        >
          <tab.Icon />
          <span>{tab.label}</span>
        </Link>
      ))}
    </div>
  );
});

const tabBarStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '18px',
  pt: 3,
  pb: 1,
  px: 10,
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  backgroundColor: '#212429',
  borderRadius: '16px 16px 0px 0px',
  w: '100%',
  maxW: 'var(--container-max-width)',
  mx: 'auto',
  h: 'var(--tab-bar-height)',
});

const tabBarLinkStyle = flex({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px',
  color: 'white.white_25',
  textStyle: 'glyph12.regular',
});
