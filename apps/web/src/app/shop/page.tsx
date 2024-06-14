'use client';

import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';
import Header from '@/components/Layout/Header';
import { useUser } from '@/store/user';
import { addNumberComma } from '@/utils/number';

import GotchaSection from './GotchaSection';
import HistoryTable from './HistoryTable';
import ProductTable from './ProductTable';
import SellListSection from './SellListSection';
import SellSection from './SellSection';
import Tab from './Tab';

// TODO: 폴더정리 필요
function ShopPage() {
  const searchParam = useSearchParams();
  const tab = searchParam?.get('tab') || 'products';

  const { points } = useUser();

  return (
    <>
      <HeaderStyled>
        <Header />
      </HeaderStyled>
      <Main>
        <DottedThreeBox width={1412} height={824} bgColor="#FFA109">
          <ShopMain>
            <TopSection>
              <Heading>Git Animals Auction</Heading>
            </TopSection>

            <TabSection>
              <Tab selectedTab={tab} />

              <div>my points : {addNumberComma(points)}</div>
            </TabSection>
            <GotchaSection />
            <section style={{ height: '655px' }}>
              {tab === 'products' && <ProductTable />}
              {tab === 'history' && <HistoryTable />}
              {tab === 'sell' && <SellSection />}
              {tab === 'sellList' && <SellListSection />}
            </section>
          </ShopMain>
        </DottedThreeBox>
      </Main>
    </>
  );
}

export default ShopPage;

const TabSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 24px;
`;

const HeaderStyled = styled.div`
  height: 70px;
  .header {
    max-width: 1460px;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-width: fit-content;
  min-height: calc(100vh - 100px);
`;

const TopSection = styled.section`
  margin-bottom: 30px;
  display: flex;
  gap: 120px;
`;

const Heading = styled.h1`
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 44.8px */
  letter-spacing: -0.3px;
`;

const ShopMain = styled.main`
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 384px 960px;
  grid-column-gap: 16px;
`;
