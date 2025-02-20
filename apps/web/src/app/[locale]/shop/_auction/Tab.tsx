import type { ReactNode } from 'react';
import { css } from '_panda/css';

import { Link } from '@/i18n/routing';

import type { TabType } from '../type';

interface TabItemType {
  label: string;
  key: string;
  path: string;
}

const TAB: TabItemType[] = [
  {
    label: 'Products',
    key: 'products',
    path: '/shop?tab=products',
  },
  {
    label: 'History',
    key: 'history',
    path: '/shop?tab=history',
  },
  {
    label: 'Sell',
    key: 'sell',
    path: '/shop?tab=sell',
  },
  {
    label: 'Sell list',
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
    <div className={tabContainerStyle}>
      <div className={tabItemContainerStyle}>
        {TAB.map((item) => (
          <TabItem isSelected={item.key === selectedTab} {...item} key={item.key} />
        ))}
      </div>

      {rightElement}
    </div>
  );
}

export default Tab;

const tabContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '32px',

  _mobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '32px',
    marginBottom: '12px',
  },
});

const tabItemContainerStyle = css({
  _mobile: {
    backgroundColor: 'black.black_25',
    padding: '4px',
    margin: 'auto',
    borderRadius: '16px',
  },
});

function TabItem({ isSelected, label, path }: { isSelected?: boolean } & TabItemType) {
  return (
    <Link className={isSelected ? selectedLinkCss : nonSelectedLinkCss} href={path} shallow scroll={false}>
      {label}
    </Link>
  );
}

const defaultLinkCss = css.raw({
  padding: '4px 10px',
  textStyle: 'glyph24.bold',
  fontFeatureSettings: 'liga off, clig off',
  transition: 'all 0.3s ease',

  _mobile: {
    padding: '0 12px',
    display: 'inline-flex',
    textStyle: 'glyph16.bold',
    height: '32px',
    borderRadius: '32px',
    lineHeight: '32px',
  },
});

const selectedLinkCss = css(defaultLinkCss, {
  color: 'white',

  _mobile: { color: 'white.white_75', backgroundColor: 'white.white_10' },
});

const nonSelectedLinkCss = css(defaultLinkCss, {
  color: 'white.white_25',

  _mobile: { color: 'white.white_25' },
});
