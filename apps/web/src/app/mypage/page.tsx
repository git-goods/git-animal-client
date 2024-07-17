'use client';

import React, { Suspense, useState } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Button from '@/components/Button';
import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';

import FarmType from './FarmType';
import OneType from './OneType';

const LazyProfileSection = dynamic(() => import('./ProfileSection'), { ssr: false });

type ChooseType = '1-type' | 'farm-type';

export const metadata: Metadata = {
  title: 'GitAnimals | Mypage',
};

function Mypage() {
  const [selectedType, setSelectedType] = useState<ChooseType>('1-type');

  return (
    <Layout>
      <Header />
      <Main>
        <Suspense fallback={<section></section>}>
          <LazyProfileSection />
        </Suspense>
        <RightSection>
          <TypeSelect>
            <Button
              color="secondary"
              onClick={() => setSelectedType('1-type')}
              className={selectedType === '1-type' ? 'selected' : ''}
            >
              1 Type
            </Button>
            <Button
              color="secondary"
              onClick={() => setSelectedType('farm-type')}
              className={selectedType === 'farm-type' ? 'selected' : ''}
            >
              Farm Type
            </Button>
          </TypeSelect>
          <div style={{ minWidth: '1000px' }}>
            {selectedType === '1-type' && <OneType />}
            {selectedType === 'farm-type' && <FarmType />}
          </div>
        </RightSection>
      </Main>
    </Layout>
  );
}

export default Mypage;

const Main = styled.main`
  padding-top: 170px;
  display: grid;
  justify-content: center;
  gap: 100px;
  grid-template-columns: 230px 1fr;
  max-width: 1200px;
  width: fit-content;
  margin: 0 auto;
`;

const RightSection = styled.section``;

const TypeSelect = styled.section`
  button {
    opacity: 0.1;
  }
  button.selected {
    opacity: 1;
  }
`;
