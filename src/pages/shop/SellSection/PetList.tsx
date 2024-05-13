/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled from 'styled-components';

import { useGetAllPets } from '@/apis/user/useGetAllPets';
import { STATIC_IMAGE_URL } from '@/constants/outlink';
import { useUser } from '@/store/user';

function PetList() {
  const { username } = useUser();
  console.log('username: ', username);

  const { data } = useGetAllPets(username);

  const personas = data?.personas || [];
  console.log('data: ', data);
  return (
    <ListContainer>
      {personas.map((persona) => {
        return (
          <PetItemContainer key={persona.id}>
            <img src={`${STATIC_IMAGE_URL}/${persona.type}`} width={82} height={82} alt={persona.type} />
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

const PetItemContainer = styled.div`
  background-image: url('/shop/pet-box-bg.svg');
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
`;
