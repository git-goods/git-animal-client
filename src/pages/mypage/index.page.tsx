/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import { getGitanimalsLineString } from '@/components/Gitanimals';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useUser } from '@/store/user';
import { addNumberComma } from '@/utils/number';

import FarmType from './FarmType';
import OneType from './OneType';

type ChooseType = '1-type' | 'farm-type';

function Mypage() {
  const { username, profileImage, points } = useUser();

  const [_, copy] = useCopyToClipboard();

  const [selectedType, setSelectedType] = useState<ChooseType>('1-type');

  const onCopyLink = () => {
    if (selectedType === '1-type') {
      copy(getGitanimalsLineString({ username }));
    }
  };

  return (
    <Layout>
      <Header />
      <Main>
        <Profile>
          <div className="profile-image">
            <img src={profileImage} alt="profile" width={160} height={160} />
          </div>
          <p className="profile-name">{username}</p>
          <p className="point">Points: {addNumberComma(points)}</p>
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

const Profile = styled.section`
  .profile-image {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background-color: #fff;
    overflow: hidden;
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

    white-space: nowrap;
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
