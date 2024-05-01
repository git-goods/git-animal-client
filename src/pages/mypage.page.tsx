/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Layout from '@/components/Layout';

type ChooseType = '1-type' | 'farm-type';

function Mypage() {
  const [selectedType, setSelectedType] = useState<ChooseType>('1-type');
  const [selectedPet, setSelectedPet] = useState<number>();

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
          <ChangePet>
            <h2>Change pet</h2>
            <div className="pet-list">
              {Array.from({ length: 10 }).map((_, index) => (
                <button
                  className={selectedPet && selectedPet === index ? 'selected' : ''}
                  key={index}
                  onClick={() => setSelectedPet(index)}
                >
                  <Image className="pet-image" src="/pets/penguin.svg" alt="penguin" width={41} height={80} />
                  {selectedPet === index && (
                    <Image className="check-icon" src="/icon/check-mono.svg" alt="check" width={24} height={24} />
                  )}
                </button>
              ))}
            </div>
          </ChangePet>
          <Preview>
            <img alt="preview image" src="/preview-image.png" width={600} height={300} />
          </Preview>
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
  margin: 0 auto;
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

const ChangePet = styled.section`
  margin-top: 46px;
  padding-left: 36px;
  > h2 {
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 30px;
    line-height: normal;
  }
  .pet-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .check-icon {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    margin: 0 auto;
    filter: brightness(1);
  }
  button {
    position: relative;
    &.selected .pet-image {
      filter: brightness(0.5);
    }
  }
`;

const Preview = styled.section`
  width: fit-content;
  margin: 84px auto 77px;
`;
