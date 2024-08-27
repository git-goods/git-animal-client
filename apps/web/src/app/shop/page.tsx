import { Suspense } from 'react';
import { css } from '_panda/css';

import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';
import Header from '@/components/Layout/Header2';
import Layout from '@/components/Layout/Layout';
import UserPoint from '@/components/UserPoint';

import GotchaSection from './GotchaSection';
import ShopInner from './ShopInner';
import Tab from './Tab';

function ShopPage({
  searchParams,
}: {
  searchParams: {
    tab: string;
  };
}) {
  return (
    <Layout>
      <Header />
      <main className={mainStyle}>
        <DottedThreeBox width={1412} height={900} bgColor="#FFA109">
          <div className={shopMainStyle}>
            <section className={topSectionStyle}>
              <h1 className={headingStyle}>Git Animals Auction</h1>
            </section>
            <section className={tabSectionStyle}>
              <Tab selectedTab={searchParams.tab} />
              <Suspense>
                my points : <UserPoint />
              </Suspense>
            </section>
            <GotchaSection />
            <ShopInner tab={searchParams.tab ?? 'products'} />
          </div>
        </DottedThreeBox>
      </main>
    </Layout>
  );
}

export default ShopPage;

const mainStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  minWidth: 'fit-content',
  minHeight: 'calc(100vh - 100px)',
});
const tabSectionStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '24px',
});

const shopMainStyle = css({
  padding: '40px 20px',

  display: 'grid',
  gridTemplateColumns: '384px 960px',
  gridColumnGap: '16px',
});

// const TopSection = styled.section`
//   margin-bottom: 30px;
//   display: flex;
//   gap: 120px;
// `;

// const Heading = styled.h1`
//   font-size: 32px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 140%; /* 44.8px */
//   letter-spacing: -0.3px;
// `;

const topSectionStyle = css({
  marginBottom: '30px',
  display: 'flex',
  gap: '120px',
});

const headingStyle = css({
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '140%' /* 44.8px */,
  letterSpacing: '-0.3px',
});
