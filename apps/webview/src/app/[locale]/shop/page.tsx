import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

// import GNB from '@/components/GNB/GNB';
import { BackgroundSection } from './_background/BackgroundSection';
import { FloatingPointSection } from './_common/FloatingPointSection';
import { AuctionSection } from './_auction';
import { PetGotcha } from './_petGotcha';
import type { TabType } from './type';
import { TABS } from './type';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page');

  return {
    title: t('shop'),
  };
}

async function ShopPage({
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
    <div>
      <FloatingPointSection />
      <main>
        <PetGotcha />
        <AuctionSection selectedTab={searchParamsTab} />
        <BackgroundSection />
      </main>
    </div>
  );
}

export default ShopPage;
