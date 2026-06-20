import { type ReactNode } from 'react';

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
    <section className="relative flex flex-col items-center pt-[120px] px-[20px] pb-[240px] w-full min-h-[1400px] bg-[linear-gradient(180deg,#000_0%,#004875_38.51%,#005B93_52.46%,#006FB3_73.8%,#0187DB_100%)] mobile:pt-[40px] mobile:px-[16px] mobile:pb-[80px] mobile:min-h-[552px]">
      <h2 className="glyph82-bold text-white mb-[80px] mobile:glyph48-bold mobile:mb-[40px]">Auction</h2>

      <div className="rounded-[16px] bg-[rgba(255,255,255,0.1)] backdrop-blur-[7px] p-[40px] max-w-[1120px] w-full z-floating min-h-[924px] h-auto mobile:h-auto mobile:min-h-[auto] mobile:bg-none mobile:backdrop-blur-none mobile:p-0 mobile:pb-[12px]">
        <Tab selectedTab={selectedTab} rightElement={TAB_RIGHT_ELEMENT[selectedTab]} />
        {SHOP_INNER_MAP[selectedTab]}
      </div>

      <Background />
    </section>
  );
}
