import React from 'react';
import styled from 'styled-components';

function PetList() {
  return (
    <div>
      <PetItemContainer>asd</PetItemContainer>
    </div>
  );
}

export default PetList;

const PetItemContainer = styled.div`
  background-image: url('/shop/pet-box-bg.svg');
  width: 84px;
  height: 84px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
