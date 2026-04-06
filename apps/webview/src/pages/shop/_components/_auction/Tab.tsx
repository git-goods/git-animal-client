import type { ReactNode } from 'react';

import type { TabType } from './type';

import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { cn } from '@gitanimals/ui-tailwind/utils';

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

const tabLinkBase =
  "inline-flex h-8 items-center rounded-full px-3 text-glyph-16 font-bold leading-8 transition-all duration-300 ease-in-out [font-feature-settings:'liga'_off,'clig'_off]";

// TODO: tab 구조 변경 필요, rightElement 분리
function Tab({ selectedTab, rightElement }: Props) {
  const [_, setTab] = useQueryState(
    'tab',
    parseAsStringLiteral(['products', 'history', 'sell', 'sellList']).withDefault('products'),
  );

  return (
    <div className="mb-3 flex flex-col items-start justify-between gap-8">
      <div className="m-auto rounded-2xl bg-black/25 p-1">
        {TAB.map((item) => (
          <button
            key={item.key}
            className={cn(
              tabLinkBase,
              item.key === selectedTab ? 'bg-white/10 text-white/75' : 'text-white/25',
            )}
            onClick={() => setTab(item.key as TabType)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {rightElement}
    </div>
  );
}

export default Tab;
