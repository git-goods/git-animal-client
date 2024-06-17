/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import styled from 'styled-components';

import { useGetPersonaTypes } from '@/apis/auctions/useGetPersonaTypes';
import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';
import Modal from '@/components/Modal/Modal';
import { getPersonaImage } from '@/utils/image';

interface SearchProps {
  onSelect: (personaType?: string) => void;
  selected?: string;
}

function Search(props: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetPersonaTypes({
    enabled: isOpen,
  });

  const onClick = (personaType?: string) => {
    props.onSelect(personaType);
    setIsOpen(false);
  };

  return (
    <DottedThreeBox width={54} height={54} bgColor="white">
      <ButtonWrapper onClick={() => setIsOpen(true)}>
        <SearchIcon />
      </ButtonWrapper>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SearchPopup>
          <DottedThreeBox width={800} height={700} bgColor="#fff">
            <Heading>Select Find Persona</Heading>
            {props.selected && (
              <SelectPersona>
                Selected Persona : {props.selected}
                <button onClick={() => onClick()}>
                  <CloseIcon />
                </button>
              </SelectPersona>
            )}
            <SearchPopupInner>
              {data?.productTypes.map((type) => (
                <PersonaItem key={type.name} onClick={() => onClick(type.name)}>
                  <PersonaItemImg>
                    <img src={getPersonaImage(type.name)} alt={type.name} width={70} height={70} />
                  </PersonaItemImg>
                  <span>{type.name}</span>
                </PersonaItem>
              ))}
            </SearchPopupInner>
          </DottedThreeBox>
        </SearchPopup>
      </Modal>
    </DottedThreeBox>
  );
}

export default Search;

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
      <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
    </svg>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Heading = styled.h2`
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  margin: 24px 0;
`;
const SearchPopup = styled.div`
  width: 800px;
  height: 700px;
`;

const SelectPersona = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  button {
    height: 24px;
  }
`;
const SearchPopupInner = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
  justify-content: space-between;
  text-align: center;
  gap: 24px 8px;
`;
const PersonaItemImg = styled.div`
  min-height: 76px;
`;

const PersonaItem = styled.div`
  cursor: pointer;
  &:hover {
    // 점프하는 애니메이션
    ${PersonaItemImg} {
      animation: jump 0.5s infinite;

      @keyframes jump {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }
`;

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#878787">
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}
