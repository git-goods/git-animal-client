import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';
import { center } from '_panda/patterns';

import GNB from '@/components/GNB/GNB';

import { BackgroundSection } from './BackgroundSection/BackgroundSection';
import { FloatingPointSection } from './FloatingPointSection/FloatingPointSection';
import { AuctionSection } from './AuctionSection';
import { PetGotcha } from './PetGotcha';
import type { TabType } from './type';
import { TABS } from './type';

async function ShopPage({
  searchParams,
}: {
  searchParams: {
    tab: TabType | undefined;
  };
}) {
  const searchParamsTab = searchParams.tab ?? 'products';
  const t = await getTranslations('Shop');

  // NOTE: 탭이 없을 때는 기본값으로 products를 사용
  if (!TABS.includes(searchParamsTab)) {
    return notFound();
  }

  return (
    <>
      <div className={subStyle}>
        <GNB />
        <FloatingPointSection />

        <main>
          <PetGotcha />
          <AuctionSection selectedTab={searchParamsTab} />
          <BackgroundSection />
        </main>
      </div>
      {/* <div className={noticeStyle}>{t('no-mobile-support')}</div> */}
    </>
  );
}

export default ShopPage;

const subStyle = css({});

const noticeStyle = center({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: '#454545',
  color: 'white',
  zIndex: 1000,
  display: 'none',
  textStyle: 'glyph24.bold',
  lineHeight: '1.5',
  textAlign: 'center',
  _mobile: {
    display: 'flex',
  },
});
