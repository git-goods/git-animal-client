import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useUseCoupon } from '@/apis/user/useUseCoupons';
import Button from '@/components/Button';
import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';
import SelectAnimals from '@/components/SelectAnimals';
import { COUPON_CODE } from '@/constants/coupon';

function StartPage() {
  const router = useRouter();

  const [selected, setSelected] = useState<string>();

  const { mutate } = useUseCoupon({
    onSuccess: () => {
      router.replace('/mypage');
    },
    onError: () => {
      alert('Failed to choose pet retry!');
    },
  });

  const onChoose = () => {
    if (!selected) return;

    mutate({
      code: COUPON_CODE.NEW_USER_BONUS_PET,
      dynamic: selected,
    });
  };

  return (
    <Layout>
      <Header />
      <Main>
        <Heading>Select 1 Start Pet</Heading>
        <SelectAnimals selected={selected} setSelected={setSelected} />
        <Button onClick={onChoose} disabled={!selected}>
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
