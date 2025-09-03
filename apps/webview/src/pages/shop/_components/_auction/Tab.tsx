import type { ReactNode } from 'react';
import { css } from '_panda/css';

import type { TabType } from './type';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

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
  const [_, setTab] = useQueryState(
    'tab',
    parseAsStringLiteral(['products', 'history', 'sell', 'sellList']).withDefault('products'),
  );

  return (
    <div className={tabContainerStyle}>
      <div className={tabItemContainerStyle}>
        {TAB.map((item) => (
          <button
            className={item.key === selectedTab ? selectedLinkCss : nonSelectedLinkCss}
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

const tabContainerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '32px',
  marginBottom: '12px',
});

const tabItemContainerStyle = css({
  backgroundColor: 'black.black_25',
  padding: '4px',
  margin: 'auto',
  borderRadius: '16px',
});

const defaultLinkCss = css.raw({
  fontFeatureSettings: 'liga off, clig off',
  transition: 'all 0.3s ease',

  padding: '0 12px',
  display: 'inline-flex',
  textStyle: 'glyph16.bold',
  height: '32px',
  borderRadius: '32px',
  lineHeight: '32px',
});

const selectedLinkCss = css(defaultLinkCss, {
  color: 'white.white_75',
  backgroundColor: 'white.white_10',
});

const nonSelectedLinkCss = css(defaultLinkCss, {
  color: 'white.white_25',
});
