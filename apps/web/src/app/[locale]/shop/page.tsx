import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { css } from '_panda/css';

import Header from '@/components/Layout/Header';

import { FloatingPointSection } from './FloatingPointSection/FloatingPointSection';

import { AuctionSection } from './AuctionSection';
import GotchaSection from './GotchaSection';
import type { TabType } from './type';
import { TABS } from './type';

function ShopPage({
  searchParams,
}: {
  searchParams: {
    tab: TabType | undefined;
  };
}) {
  const searchParamsTab = searchParams.tab ?? 'products';

  // NOTE: 탭이 없을 때는 기본값으로 products를 사용
  if (!TABS.includes(searchParamsTab)) {
    return notFound();
  }

  return (
    <>
      <Header />
      <FloatingPointSection />

      <main className={mainStyle}>
        <GotchaSection />
        <AuctionSection selectedTab={searchParamsTab} />
      </main>
    </>
  );
}

export default ShopPage;

const mainStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: 'calc(100vh - 100px)',
  backgroundColor: '#297542',
});
