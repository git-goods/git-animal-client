/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styled from 'styled-components';

import { useGetAllPets } from '@/apis/user/useGetAllPets';
import { GitanimalsFarm } from '@/components/Gitanimals';
import SelectAnimalList from '@/components/SelectAnimalList';
import type { PetInfoSchema } from '@/schema/user';
import { useUser } from '@/store/user';

import { FarmSection } from './index.styles';

function FarmType() {
  const [selectedPet, setSelectedPet] = useState<PetInfoSchema[]>([]);
  const { username } = useUser();

  const { data } = useGetAllPets(username, {
    enabled: Boolean(username),
  });
  const personaList = data?.personas || [];

  const onSelectedPet = (index: PetInfoSchema) => {
    const isSelected = selectedPet.find((key) => key === index);
    if (isSelected) {
      setSelectedPet((prev) => prev.filter((key) => key !== index));
      return;
    }
    setSelectedPet((prev) => [...prev, index]);
  };

  return (
    <>
      <ChangePet>
        <h2>Change pet</h2>

        <SelectAnimalList selectedList={selectedPet} setSelected={onSelectedPet} size={120} personaList={personaList} />

        {/* <div className="pet-list">
          {Array.from({ length: 10 }).map((_, index) => {
            const isSelected = selectedPet.find((key) => key === index);
            return (
              <button
                className={isSelected ? 'selected' : ''}
                key={index}
                onClick={() => setSelectedPet((prev) => [...prev, index])}
              >
                <Image className="pet-image" src="/pets/penguin.svg" alt="penguin" width={41} height={80} />
                {isSelected && (
                  <Image className="check-icon" src="/icon/check-mono.svg" alt="check" width={24} height={24} />
                )}
              </button>
            );
          })}
        </div> */}
      </ChangePet>
      <Preview>
        <GitanimalsFarm username={username} sizes={[600, 300]} />
      </Preview>
    </>
  );
}

export default FarmType;

const ChangePet = styled(FarmSection)`
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

const Preview = styled(FarmSection)`
  width: fit-content;
  margin: 44px auto 0;
`;
