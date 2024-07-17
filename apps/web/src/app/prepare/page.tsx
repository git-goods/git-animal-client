import type { Metadata } from 'next';
import styled from 'styled-components';

import Button from '@/components/Button';
import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';

export const metadata: Metadata = {
  title: 'GitAnimals | Prepare',
};

function PreparePage() {
  return (
    <Layout>
      <Header />
      <Container>
        <Heading>준비중입니다.</Heading>
        <Button href="/">돌아가기</Button>
      </Container>
    </Layout>
  );
}

export default PreparePage;

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
