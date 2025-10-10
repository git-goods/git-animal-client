import { memo, useCallback } from 'react';
import { css } from '_panda/css';
import { LevelBanner } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

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

const gridStyle = css({
  display: 'grid',
  gap: '8px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, auto))',
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
        const selected = pet.id === targetPet?.id || materialPets.some((material) => material.id === pet.id);
        return <MemoizedPersonaItem persona={pet} isSelected={selected} onClick={() => onPetClick(pet)} />;
      }}
    />
  );
}

interface PersonaItemProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
}

function PersonaItem({ persona, isSelected, onClick }: PersonaItemProps) {
  return (
    <button
      onClick={onClick}
      className={css({ outline: 'none', bg: 'transparent', width: '100%', height: '100%' })}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
    >
      <LevelBanner
        image={getPersonaImage(persona.type)}
        status={isSelected ? 'selected' : 'default'}
        level={Number(persona.level)}
        className={css({ width: '100%', height: '100%' })}
        size="full"
      />
    </button>
  );
}

const MemoizedPersonaItem = memo(PersonaItem, (prev, next) => {
  return prev.isSelected === next.isSelected && prev.persona.level === next.persona.level;
});
