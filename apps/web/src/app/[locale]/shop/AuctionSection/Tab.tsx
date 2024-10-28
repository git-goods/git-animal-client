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

function Tab({ selectedTab, rightElement }: Props) {
  return (
    <div className={tabContainerStyle}>
      <div>
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
  marginBottom: 32,
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
});

const selectedLinkCss = css(defaultLinkCss, {
  color: 'white',
});

const nonSelectedLinkCss = css(defaultLinkCss, {
  color: 'white.white_25',
});
