import { type ReactNode } from 'react';
import { css } from '_panda/css';

import { TABS, type TabType } from './type';

import SellSection from './SellSection/SellSection';
import { Background } from './Background';
import { DefaultTabRight } from './DefaultTabRight';
import HistoryTable from './HistoryTable';
import SellListSection from './MySellList';
import ProductTable from './ProductTable';
import Tab from './Tab';
import { useQueryState, parseAsStringLiteral } from 'nuqs';

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

const sectionCss = css({
  position: 'relative',
  display: 'flex',
  flexDir: 'column',
  alignItems: 'center',
  width: '100%',
  bg: 'linear-gradient(180deg, #000 0%, #004875 38.51%, #005B93 52.46%, #006FB3 73.8%, #0187DB 100%)',

  padding: '40px 16px 80px',
  minH: '552px',
});

const h2Css = css({
  color: 'white',

  textStyle: 'glyph48.bold',
  marginBottom: '40px',
});

const divCss = css({
  borderRadius: '16px',
  maxW: '1120px',
  width: '100%',
  zIndex: 'floating',
  minH: '924px',

  height: 'auto',
  padding: '0',
  paddingBottom: '12px',
});
