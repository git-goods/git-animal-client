import { type ReactNode } from 'react';
import { css } from '_panda/css';

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
  minH: '1400px',
  bg: 'linear-gradient(180deg, #000 0%, #004875 38.51%, #005B93 52.46%, #006FB3 73.8%, #0187DB 100%)',

  _mobile: {
    padding: '40px 16px 80px',
    minH: 'auto',
  },
});

const h2Css = css({
  textStyle: 'glyph82.bold',
  color: 'white',
  marginBottom: '80px',

  _mobile: {
    textStyle: 'glyph48.bold',
    marginBottom: '40px',
  },
});

const divCss = css({
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(7px)',
  padding: '40px',
  maxW: '1120px',
  width: '100%',
  zIndex: 'floating',
  height: '924px',

  _mobile: {
    height: 'auto',
    background: 'none',
    backdropFilter: 'none',
    padding: '0',
    paddingBottom: '12px',
  },
});
