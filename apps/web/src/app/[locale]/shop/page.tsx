import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';

import { ErrorPage } from '@/components/Error/ErrorPage';
import { Link } from '@/i18n/routing';

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
      <ErrorPage
        heading="Store temporarily unavailable 😭"
        paragraph={
          <div className={css({ textAlign: 'center' })}>
            Server normalization operation is in progress. <br />
            <br />
            <Link href="/">
              <Button>Back to Main</Button>
            </Link>
          </div>
        }
      />
      {/* <GNB />
      <FloatingPointSection />

      <main>
        <PetGotcha />
        <AuctionSection selectedTab={searchParamsTab} />
        <BackgroundSection />
      </main> */}
    </div>
  );
}

export default ShopPage;
