/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled from 'styled-components';

import { useGetAllPets } from '@/apis/user/useGetAllPets';
import type { PetInfoSchema } from '@/schema/user';
import { useUser } from '@/store/user';
import { getPersonaImage } from '@/utils/image';

interface Props {
  selectedPersona?: PetInfoSchema;
  onProductClick: (product: PetInfoSchema) => void;
}

function PetList(props: Props) {
  const { username } = useUser();

  const { data } = useGetAllPets(username);

  const personas = data?.personas || [];

  return (
    <ListContainer>
      {personas.map((persona) => {
        return (
          <PetItemContainer
            key={persona.id}
            onClick={() => props.onProductClick(persona)}
            isSelected={props.selectedPersona?.id === persona.id}
          >
            <img src={getPersonaImage(persona.type)} width={82} height={82} alt={persona.type} />
          </PetItemContainer>
        );
      })}
    </ListContainer>
  );
}

export default PetList;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PetItemContainer = styled.div<{ isSelected?: boolean }>`
  background-image: url('/shop/pet-box-bg.svg');
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;

  ${({ isSelected }) => isSelected && 'filter: brightness(0.7);'}
  cursor: pointer;
  transition: filter 0.3s;

  img {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`;
