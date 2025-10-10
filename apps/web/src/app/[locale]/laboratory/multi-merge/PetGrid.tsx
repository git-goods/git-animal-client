import { useCallback } from 'react';
import { css } from '_panda/css';

import { DragSelectContainer } from '../../../../components/DragSelect';

type Persona = {
  id: string;
  type: string;
  level: string;
  visible: boolean;
  dropRate: string;
  grade: 'DEFAULT' | 'EVOLUTION' | 'COLLABORATOR';
  isEvolutionable?: boolean;
};

interface PetGridProps {
  pets: Persona[];
  onPetClick: (pet: Persona) => void;
  onMultiplePetSelect: (pets: Persona[]) => void;
  isSelected: (petId: string) => string | false;
  getEmojiByType: (type: string) => string;
  targetPet: Persona | null;
  materialPets: Persona[];
}

// PetGrid 스타일
const petsGridStyle = css({
  flex: '1',
  padding: '0 32px 24px',
  maxHeight: '300px',
});

const gridStyle = css({
  display: 'grid',
  gap: '8px',
  gridTemplateColumns: 'repeat(7, 1fr)',
  // gap: '8px',
  // '@media (min-width: 640px)': {
  //   gridTemplateColumns: 'repeat(10, 1fr)',
  // },
  // '@media (min-width: 768px)': {
  //   gridTemplateColumns: 'repeat(13, 1fr)',
  // },
});

const petCardStyle = css({
  position: 'relative',
  aspectRatio: '1',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all',
  background: 'gray.gray_200',
  border: '2px solid',
  borderColor: 'transparent',
  _hover: {
    borderColor: 'gray.gray_400',
  },
});

const petCardSelectedStyle = css({
  background: 'brand.sky_dark',
  borderColor: 'brand.sky',
  transform: 'scale(0.95)',
});

const checkIconStyle = css({
  position: 'absolute',
  top: '4px',
  left: '4px',
  background: 'brand.sky',
  color: 'white.white_100',
  fontSize: '10px',
  borderRadius: '50%',
  width: '16px',
  height: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  zIndex: '10',
});

const petLevelStyle = css({
  color: 'white.white_100',
  fontSize: '10px',
  fontWeight: 'medium',
  background: 'black.black_50',
  padding: '2px 8px',
  borderRadius: '4px',
});

export function PetGrid({
  pets,
  onPetClick,
  onMultiplePetSelect,
  isSelected,
  getEmojiByType,
  targetPet,
  materialPets,
}: PetGridProps) {
  const handleSelectionEnd = useCallback(
    (selectedPets: Persona[]) => {
      if (!targetPet || selectedPets.length === 0) return;

      // 현재 선택된 펫들의 ID
      const currentSelectedIds = pets
        .filter((pet) => materialPets.some((material) => material.id === pet.id))
        .map((pet) => pet.id);

      // 드래그된 영역의 펫들 (타겟 제외)
      const draggedPets = selectedPets.filter((pet) => pet.id !== targetPet.id);
      const draggedPetIds = draggedPets.map((pet) => pet.id);

      // 토글 로직 구현
      let newMaterialPets: Persona[];

      // 드래그된 영역의 모든 펫이 현재 선택되어 있는지 확인
      const allDraggedPetsSelected = draggedPets.every((pet) => currentSelectedIds.includes(pet.id));

      if (allDraggedPetsSelected && draggedPets.length > 0) {
        // 모든 드래그된 펫이 선택되어 있으면 → 해제
        newMaterialPets = materialPets.filter((material) => !draggedPetIds.includes(material.id));
      } else {
        // 일부만 선택되어 있거나 선택되지 않은 상태면 → 모두 선택
        const newSelectedIds = [...new Set([...currentSelectedIds, ...draggedPetIds])];
        newMaterialPets = pets.filter((pet) => newSelectedIds.includes(pet.id));
      }

      // 드래그가 끝났을 때만 실제 재료에 반영
      onMultiplePetSelect(newMaterialPets);
    },
    [targetPet, pets, materialPets, onMultiplePetSelect],
  );

  return (
    <DragSelectContainer<Persona>
      items={pets}
      getItemId={(pet: Persona) => pet.id}
      onSelectionEnd={handleSelectionEnd}
      isEnabled={!!targetPet}
      className={gridStyle}
      itemClassName={`${petCardStyle}`}
      renderItem={(pet, { isSelected: isDraggingThisPet }) => {
        const selected = isSelected(pet.id);
        return (
          <div
            className={`${selected ? petCardSelectedStyle : ''} ${isDraggingThisPet ? petCardSelectedStyle : ''}`}
            onClick={() => onPetClick(pet)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPetClick(pet);
              }
            }}
            role="button"
            tabIndex={0}
          >
            {(selected || isDraggingThisPet) && <div className={checkIconStyle}>✓</div>}
            <span style={{ fontSize: '24px', marginBottom: '4px' }}>{getEmojiByType(pet.type)}</span>
            <span className={petLevelStyle}>Lv.{pet.level}</span>
          </div>
        );
      }}
    />
  );
}
