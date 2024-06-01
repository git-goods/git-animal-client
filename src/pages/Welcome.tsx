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
    </Container>
  );
}

export default Welcome;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  color: #fff;
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: #141414;
  font-size: 77px;
  line-height: 140%; /* 107.8px */

  margin-bottom: 30px;

  strong {
    color: #ff9c00;
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
