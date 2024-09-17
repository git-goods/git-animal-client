import type { ReactNode } from 'react';
import { css } from '_panda/css';

import HistoryTable from '../HistoryTable';
import ProductTable from '../ProductTable';
import SellListSection from '../SellListSection';
import { SellSection } from '../SellSection';
import type { TabType } from '../type';

import { Background } from './Background';
import { DefaultTabRight } from './DefaultTabRight';
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
  padding: '120px 20px 240px',
  width: '100%',
  minH: '100dvh',
  bg: 'linear-gradient(180deg, #000 0%, #004875 38.51%, #005B93 52.46%, #006FB3 73.8%, #0187DB 100%)',
});

const h2Css = css({
  textStyle: 'glyph82.bold',
  color: 'white',
  marginBottom: '80px',
});

const divCss = css({
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(7px)',
  padding: '40px',
  maxW: '1120px',
  width: '100%',
  zIndex: 1,
});
