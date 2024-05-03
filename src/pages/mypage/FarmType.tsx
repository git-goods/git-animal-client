/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { FarmSection } from './index.styles';

function FarmType() {
  const [selectedPet, setSelectedPet] = useState<number[]>([]);

  return (
    <>
      <ChangePet>
        <h2>Change pet</h2>
        <div className="pet-list">
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
        </div>
      </ChangePet>
      <Preview>
        <a href="https://github.com/devxb/gitanimals">
          <img src="https://render.gitanimals.org/farms/sumi-0011" width="600" height={300} alt="preview farm" />
        </a>
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
