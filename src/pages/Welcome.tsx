import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { checkUsedCoupons } from '@/apis/user/getUsedCoupons';
import Button from '@/components/Button';
import LoginButton from '@/components/LoginButton';
import { SUMI_GITHUB_URL } from '@/constants/outlink';
import { recordEvent } from '@/lib/gtag';

function Welcome() {
  const router = useRouter();

  const onClickHavePet = async () => {
    recordEvent({ action: 'onClickHavePet' });

    if (await checkUsedCoupons()) {
      router.replace('/mypage');
    } else {
      router.replace('/start');
    }
  };

  return (
    <Container>
      <Heading>
        Have your pet in <strong>GITHUB!</strong>
      </Heading>
      <SeeExampleButton href={SUMI_GITHUB_URL}>See Example →</SeeExampleButton>
      {/* TODO: 임시로 수미로 설정 */}
      <LoginButton>
        <Button onClick={onClickHavePet}>HAVE PET!</Button>
      </LoginButton>
      <DuckWrapper>
        <Image src="/main/ducks.png" width={300} height={200} alt="duck" />
      </DuckWrapper>
      <CatWrapper>
        <img src="/main/cats.png" width={216} height={140} alt="cat" />
      </CatWrapper>
    </Container>
  );
}

export default Welcome;

const CatWrapper = styled.div`
  position: absolute;
  top: 60%;
  left: 80%;
  transform: translate(-50%, -50%);
  animation: bounceUp 1.2s infinite;

  @keyframes bounceUp {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
`;

const DuckWrapper = styled.div`
  position: absolute;
  top: 68%;
  left: 17%;
  transform: translate(-50%, -50%);

  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    100% {
      rotate: 8deg;
      /* transform: translateY(0); */
    }
    50% {
      rotate: 10deg;
    }
  }
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  color: #fff;
  text-align: center;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: #141414;
  font-size: 77px;
  line-height: 140%; /* 107.8px */

  margin-bottom: 30px;

  strong {
    color: #ff9c00;
  }

  animation: identifier 0.5s;
  @keyframes identifier {
    0% {
      opacity: 0;
      scale: 0.7;
    }
    60% {
      opacity: 1;
      scale: 1.2;
    }
    100% {
      opacity: 1;
      scale: 1;
    }
  }
`;

const SeeExampleButton = styled.a`
  color: #fff;
  text-align: center;
  font-size: 36px;
  letter-spacing: -1px;
  margin-bottom: 100px;
  text-decoration: none;
`;
