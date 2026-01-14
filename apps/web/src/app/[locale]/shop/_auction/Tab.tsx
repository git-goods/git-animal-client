import type { ReactNode } from 'react';
import { cn } from '@gitanimals/ui-tailwind';

import { Link } from '@/i18n/routing';

import type { TabType } from '../type';

interface TabItemType {
  label: string;
  key: string;
  path: string;
}

const TAB: TabItemType[] = [
  {
    label: 'Auction',
    key: 'products',
    path: '/shop?tab=products',
  },
  {
    label: 'History',
    key: 'history',
    path: '/shop?tab=history',
  },
  {
    label: 'Sell Pets',
    key: 'sell',
    path: '/shop?tab=sell',
  },
  {
    label: 'My Sales',
    key: 'sellList',
    path: '/shop?tab=sellList',
  },
];

interface Props {
  selectedTab: TabType;
  rightElement?: ReactNode;
}

// TODO: tab 구조 변경 필요, rightElement 분리
function Tab({ selectedTab, rightElement }: Props) {
  return (
    <div className={cn(
      'flex items-center justify-between mb-8',
      'max-mobile:flex-col max-mobile:items-start max-mobile:gap-8 max-mobile:mb-3'
    )}>
      <div className={cn(
        'max-mobile:bg-black/25 max-mobile:p-1 max-mobile:mx-auto max-mobile:rounded-2xl'
      )}>
        {TAB.map((item) => (
          <TabItem isSelected={item.key === selectedTab} {...item} key={item.key} />
        ))}
      </div>

      {rightElement}
    </div>
  );
}

export default Tab;

export function TabItem({ isSelected, label, path }: { isSelected?: boolean } & TabItemType) {
  const baseStyle = cn(
    'px-2.5 py-1 font-product text-glyph-24 font-bold',
    'transition-all duration-300',
    'max-mobile:px-3 max-mobile:inline-flex max-mobile:text-glyph-16',
    'max-mobile:h-8 max-mobile:rounded-[32px] max-mobile:leading-8'
  );

  const selectedStyle = cn(
    baseStyle,
    'text-white',
    'max-mobile:text-white/75 max-mobile:bg-white/10'
  );

  const nonSelectedStyle = cn(
    baseStyle,
    'text-white/25',
    'max-mobile:text-white/25'
  );

  return (
    <Link className={isSelected ? selectedStyle : nonSelectedStyle} href={path} shallow scroll={false}>
      {label}
    </Link>
  );
}
