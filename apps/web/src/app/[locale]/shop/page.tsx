import { notFound } from 'next/navigation';

import GNB from '@/components/Layout/GNB';

import { FloatingPointSection } from './FloatingPointSection/FloatingPointSection';
import { AuctionSection } from './AuctionSection';
import { PetGotcha } from './PetGotcha';
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
      <GNB />
      <FloatingPointSection />

      <main>
        <PetGotcha />
        <AuctionSection selectedTab={searchParamsTab} />
      </main>
    </>
  );
}

export default ShopPage;
