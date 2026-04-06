import { type ReactNode } from 'react';

import { TABS, type TabType } from './type';

import SellSection from './SellSection/SellSection';
import { Background } from './Background';
import { DefaultTabRight } from './DefaultTabRight';
import HistoryTable from './HistoryTable';
import SellListSection from './MySellList';
import ProductTable from './ProductTable';
import Tab from './Tab';
import { useQueryState, parseAsStringLiteral } from 'nuqs';

const sectionCss =
  'relative flex min-h-[552px] w-full flex-col items-center bg-[linear-gradient(180deg,#000_0%,#004875_38.51%,#005B93_52.46%,#006FB3_73.8%,#0187DB_100%)] px-4 pb-20 pt-10';

const h2Css = 'mb-10 text-glyph-48 font-bold text-white';

const divCss =
  'z-floating h-auto min-h-[924px] w-full max-w-[1120px] rounded-2xl p-0 pb-3';

export function AuctionSection() {
  const [selectedTab] = useQueryState(
    'tab',
    parseAsStringLiteral(['products', 'history', 'sell', 'sellList']).withDefault('products'),
  );

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
    <section className={sectionCss}>
      <h2 className={h2Css}>Auction</h2>

      <div className={divCss}>
        <Tab selectedTab={selectedTab} rightElement={TAB_RIGHT_ELEMENT[selectedTab]} />
        {SHOP_INNER_MAP[selectedTab]}
      </div>

      <Background />
    </section>
  );
}
