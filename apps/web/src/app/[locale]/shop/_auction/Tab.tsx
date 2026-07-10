import type { ReactNode } from 'react';

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
    <div className="flex items-center justify-between mb-[32px] mobile:flex-col mobile:items-start mobile:gap-[32px] mobile:mb-[12px]">
      <div className="mobile:bg-black-25 mobile:p-[4px] mobile:m-auto mobile:rounded-[16px]">
        {TAB.map((item) => (
          <TabItem isSelected={item.key === selectedTab} {...item} key={item.key} />
        ))}
      </div>

      {rightElement}
    </div>
  );
}

export default Tab;

const defaultLinkCss =
  "py-[4px] px-[10px] glyph24-bold [font-feature-settings:liga_off,clig_off] transition-all duration-300 ease-[ease] mobile:py-0 mobile:px-[12px] mobile:inline-flex mobile:glyph16-bold mobile:h-[32px] mobile:rounded-[32px] mobile:leading-[32px]";

const selectedLinkCss = `${defaultLinkCss} text-white mobile:text-white-75 mobile:bg-white-10`;

const nonSelectedLinkCss = `${defaultLinkCss} text-white-25 mobile:text-white-25`;

export function TabItem({ isSelected, label, path }: { isSelected?: boolean } & TabItemType) {
  return (
    <Link className={isSelected ? selectedLinkCss : nonSelectedLinkCss} href={path} shallow scroll={false}>
      {label}
    </Link>
  );
}
