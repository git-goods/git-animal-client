import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

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

function Tab() {
  const [selectedTab, setSelectedTab] = useState('products');
  return (
    <TabContainer>
      {TAB.map((item) => (
        <TabItem
          isSelected={item.key === selectedTab}
          onClick={() => setSelectedTab(item.key)}
          {...item}
          key={item.key}
        />
      ))}
      {/* <TabItem isSelected />
      <TabItem />
      <TabItem /> */}
    </TabContainer>
  );
}

export default Tab;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

function TabItem(props: { isSelected?: boolean; onClick: () => void } & TabItemType) {
  return (
    <TabItemButtonStyled href={props.path} onClick={props.onClick} shallow>
      <TabItemBg color={props.isSelected ? '#D08100' : '#fff'} />
      <span>{props.label}</span>
    </TabItemButtonStyled>
  );
}

const TabItemButtonStyled = styled(Link)`
  position: relative;
  width: 128px;
  height: 54px;

  line-height: 54px;
  color: #141414;
  text-decoration: none;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;

  span {
    position: relative;
  }

  > svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const TabItemBg = ({ color = '#fff' }: { color?: string }) => (
  <svg width="128" height="54" viewBox="0 0 128 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="4" width="112" height="46" fill={color} />
    <rect x="4" y="8" width="120" height="38" fill={color} />
    <rect x="112" y="50" width="4" height="4" fill="#141414" />
    <rect x="116" y="46" width="4" height="4" fill="#141414" />
    <rect x="120" y="42" width="4" height="4" fill="#141414" />
    <rect x="124" y="12" width="4" height="30" fill="#141414" />
    <rect x="120" y="8" width="4" height="4" fill="#141414" />
    <rect x="116" y="4" width="4" height="4" fill="#141414" />
    <rect width="104" height="4" transform="matrix(-1 0 0 1 116 0)" fill="#141414" />
    <rect width="4" height="4" transform="matrix(-1 0 0 1 12 4)" fill="#141414" />
    <rect width="4" height="4" transform="matrix(-1 0 0 1 8 8)" fill="#141414" />
    <rect width="104" height="4" transform="matrix(-1 0 0 1 116 50)" fill="#141414" />
    <rect width="4" height="4" transform="matrix(-1 0 0 1 12 46)" fill="#141414" />
    <rect width="4" height="4" transform="matrix(-1 0 0 1 8 42)" fill="#141414" />
    <rect width="4" height="30" transform="matrix(-1 0 0 1 4 12)" fill="#141414" />
  </svg>
);
