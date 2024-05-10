import React, { useState } from 'react';
import styled from 'styled-components';

import { useGetUniqueTypeAllPets } from '@/apis/user/useGetAllPets';
import { GitanimalsLine } from '@/components/Gitanimals';
import SelectAnimal from '@/components/SelectAnimal';
import type { PetInfoSchema } from '@/schema/user';
import { useUser } from '@/store/user';

import { FarmSection } from './index.styles';

interface Props {}

function OneType({}: Props) {
  const [selected, setSelected] = useState<PetInfoSchema>();
  const [sizes, setSizes] = useState<[number, number]>([600, 120]);
  const [error, setError] = useState('');

  const { username } = useUser();
  const { data } = useGetUniqueTypeAllPets(username, {
    enabled: Boolean(username),
  });

  const personaList = data?.personas || [];

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setError('');

    if (value > 1000) {
      setError('1000 이상은 설정할 수 없습니다.');
    }

    setSizes([value, sizes[1]]);
  };

  const onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setSizes([sizes[0], parseInt(e.target.value)]);
  };

  return (
    <>
      <FarmSection>
        <h2>choose only one pet</h2>
        <SelectAnimal selected={selected} setSelected={setSelected} size={120} personaList={personaList} />
      </FarmSection>
      <FarmSection>
        <h2>영역을 customize 하세요</h2>
        <InputWrapper>
          <label htmlFor="width">width</label>
          <input type="number" name="width" id="width" value={sizes[0]} onChange={(e) => onWidthChange(e)} />

          <label htmlFor="height">height</label>
          <input type="number" name="height" id="height" value={sizes[1]} onChange={(e) => onHeightChange(e)} />
        </InputWrapper>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <LineContainer
          style={{
            width: sizes[0],
            height: sizes[1],
          }}
        >
          <GitanimalsLine sizes={sizes} petId={selected?.id} />
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

  img {
    max-width: 100%;
  }
`;

const ErrorMsg = styled.p`
  color: white;
  margin-bottom: 12px;
  font-size: 14px;
`;
function getUniqueTypeList(personaList: { id: string; type: string; level: string }[]) {
  throw new Error('Function not implemented.');
}
