import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import SelectAnimals from '@/components/SelectAnimals';

function StartPage() {
  const [selected, setSelected] = useState<string>();
  return (
    <Layout>
      <Header />
      <Main>
        <Heading>Select 1 Start Pet</Heading>
        <SelectAnimals selected={selected} setSelected={setSelected} />
        <Button href="/mypage" disabled={!selected}>
          I Choosed!
        </Button>
      </Main>
    </Layout>
  );
}

export default StartPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
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
`;
