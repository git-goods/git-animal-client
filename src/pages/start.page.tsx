import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Layout from '@/components/Layout';

const ANIMAL_LIST = [
  {
    key: '1',
    image: '/animals/Animals-1.png',
  },
  {
    key: '2',
    image: '/animals/Animals-2.png',
  },
  {
    key: '3',
    image: '/animals/Animals-3.png',
  },
  {
    key: '4',
    image: '/animals/Animals-4.png',
  },
  {
    key: '5',
    image: '/animals/Animals-5.png',
  },
  {
    key: '6',
    image: '/animals/Animals-6.png',
  },
  {
    key: '7',
    image: '/animals/Animals-7.png',
  },
];

function StartPage() {
  const [selected, setSelected] = useState<string>();
  return (
    <Layout>
      <Header />
      <Main>
        <Heading>Select 1 Start Pet</Heading>
        <AnimalList>
          {ANIMAL_LIST.map((animal) => (
            <button key={animal.key} onClick={() => setSelected(animal.key)}>
              {selected === animal.key && <SelectedImage src="/animals/animal-selected.svg" alt="animal" fill />}
              <Image src={animal.image} alt="animal" width={196} height={196} />
            </button>
          ))}
        </AnimalList>
        <Button href="/mypage" disabled={!selected}>
          I Choosed!
        </Button>
      </Main>
    </Layout>
  );
}

export default StartPage;

const SelectedImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const AnimalList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  button {
    position: relative;
    width: 196px;
    height: 196px;
    z-index: 1;
  }
`;

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
