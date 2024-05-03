/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Layout from '@/components/Layout';

import FarmType from './FarmType';
import OneType from './OneType';

type ChooseType = '1-type' | 'farm-type';
const USER_NAME = 'sumi-0011';
function Mypage() {
  const [selectedType, setSelectedType] = useState<ChooseType>('1-type');

  return (
    <Layout>
      <Header />
      <Main>
        <Profile>
          <div className="profile-image">{/* <Image src="/" alt="profile image" width={160} height={160} /> */}</div>
          <p className="profile-name">Devxb</p>
          <p className="point">Points: 477,000</p>
        </Profile>
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
            {selectedType === '1-type' && <OneType username={USER_NAME} />}
            {selectedType === 'farm-type' && <FarmType username={USER_NAME} />}
          </div>
          <ButtonWrapper>
            <Button>Copy Link</Button>
          </ButtonWrapper>
        </RightSection>
      </Main>
    </Layout>
  );
}

export default Mypage;

const ButtonWrapper = styled.div`
  margin: 72px auto;
  width: fit-content;
`;

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

const Profile = styled.section`
  .profile-image {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .profile-name {
    color: #fff;
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: #141414;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 56px */

    margin-top: 40px;
    margin-bottom: 30px;
  }

  .point {
    color: #fff;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #141414;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 33.6px */
  }
`;

const TypeSelect = styled.section`
  button {
    opacity: 0.1;
  }
  button.selected {
    opacity: 1;
  }
`;
