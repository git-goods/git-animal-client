import { type ReactNode } from 'react';
import { cn } from '@gitanimals/ui-tailwind';

import type { TabType } from '../type';

import SellSection from './SellSection/SellSection';
import { Background } from './Background';
import { DefaultTabRight } from './DefaultTabRight';
import HistoryTable from './HistoryTable';
import SellListSection from './MySellList';
import ProductTable from './ProductTable';
import Tab from './Tab';

interface Props {
  selectedTab: TabType;
}

export function AuctionSection({ selectedTab }: Props) {
  const SHOP_INNER_MAP: Record<TabType, ReactNode> = {
    products: <ProductTable />,
    history: <HistoryTable />,
    sell: <SellSection />,
    sellList: <SellListSection />,
  };

  const TAB_RIGHT_ELEMENT: Record<TabType, ReactNode> = {
    products: <DefaultTabRight />,
    history: <DefaultTabRight />,
    sell: null,
    sellList: null,
  };

  return (
    <section className={cn(
      'relative flex flex-col items-center',
      'px-5 pt-[120px] pb-60 w-full min-h-[1400px]',
      'bg-gradient-to-b from-black via-[#004875] via-[#005B93] via-[#006FB3] to-[#0187DB]',
      'max-mobile:px-4 max-mobile:pt-10 max-mobile:pb-20 max-mobile:min-h-[552px]'
    )}>
      <h2 className={cn(
        'font-product text-glyph-82 font-bold text-white mb-20',
        'max-mobile:text-glyph-48 max-mobile:mb-10'
      )}>
        Auction
      </h2>

      <div className={cn(
        'rounded-2xl bg-white/10 backdrop-blur-[7px]',
        'p-10 max-w-[1120px] w-full z-floating',
        'min-h-[924px] h-auto',
        'max-mobile:h-auto max-mobile:bg-transparent max-mobile:backdrop-blur-0',
        'max-mobile:p-0 max-mobile:pb-3'
      )}>
        <Tab selectedTab={selectedTab} rightElement={TAB_RIGHT_ELEMENT[selectedTab]} />
        {SHOP_INNER_MAP[selectedTab]}
      </div>

      <Background />
    </section>
  );
}
