import Image from 'next/image';
import styled from 'styled-components';

import ShopTable from './Table';

function ShopPage() {
  return (
    <Main>
      <ShopMain>
        <TopSection>
          <Heading>Git Animals Auction</Heading>
        </TopSection>
        <GotchaSection>
          <Image src="/shop/gotcha.svg" width={384} height={80} alt="gotcha" className="gotcha-title" />
          <Image src="/shop/gotcha-list.png" width={384} height={620} alt="gotcha list" className="gotcha-list" />
          <button className="gotcha-press">
            <Image src="/shop/press.svg" width={384} height={80} alt="press" />
          </button>
        </GotchaSection>
        <ShopTable />
      </ShopMain>
    </Main>
  );
}

export default ShopPage;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-width: fit-content;
  min-height: 100vh;
`;

const TopSection = styled.section`
  margin-bottom: 30px;
`;
const Heading = styled.h1`
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 44.8px */
  letter-spacing: -0.3px;
`;

const GotchaSection = styled.section`
  position: relative;
  padding-top: 6px;
  padding-bottom: 6px;
  .gotcha-title {
    position: absolute;
    top: -6px;
  }

  .gotcha-press {
    position: absolute;
    bottom: -6px;
    left: 0;
    transition: all 0.3s;

    &:active {
      transform: translateY(4px);
      filter: brightness(0.8);
    }
  }
`;

const ShopMain = styled.main`
  width: 1500px;
  height: 800px;

  background-image: url('/shop/shop-bg.svg');
  padding: 40px 20px;

  display: grid;
  grid-template-columns: 384px 1fr;
  grid-column-gap: 132px;

  ${TopSection} {
    grid-column: 1 / span 2;
  }
`;
