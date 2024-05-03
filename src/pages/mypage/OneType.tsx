/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styled from 'styled-components';

import SelectAnimals from '@/components/SelectAnimals';

import { FarmSection } from './index.styles';

interface Props {
  username: string;
}

function OneType({ username }: Props) {
  const [selected, setSelected] = useState<string>();
  const [sizes, setSizes] = useState([600, 120]);

  return (
    <>
      <FarmSection>
        <h2>choose only one pet</h2>
        <SelectAnimals selected={selected} setSelected={setSelected} size={120} />
      </FarmSection>
      <FarmSection>
        <h2>영역을 customize 하세요</h2>
        <InputWrapper>
          <label htmlFor="width">width</label>
          <input
            type="number"
            name="width"
            id="width"
            value={sizes[0]}
            onChange={(e) => setSizes([parseInt(e.target.value), sizes[1]])}
          />

          <label htmlFor="height">height</label>
          <input
            type="number"
            name="height"
            id="height"
            value={sizes[1]}
            onChange={(e) => setSizes([sizes[0], parseInt(e.target.value)])}
          />
        </InputWrapper>
        <LineContainer
          style={{
            width: sizes[0],
            height: sizes[1],
          }}
        >
          <a href="https://github.com/devxb/gitanimals">
            <img src={`https://render.gitanimals.org/lines/${username} `} width={sizes[0]} height={sizes[1]} />
          </a>
        </LineContainer>
      </FarmSection>
    </>
  );
}

export default OneType;

const InputWrapper = styled.div`
  color: white;
  display: flex;
  margin-bottom: 24px;
  align-items: center;

  gap: 12px;

  input {
    width: 100px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #141414;
    padding: 0 8px;
    outline: 1px solid #141414;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const LineContainer = styled.div`
  width: 100%;
  background: white;
  height: 100%;
  transition: all 0.3s;
  max-width: 1000px;

  margin: 24px auto;
`;
