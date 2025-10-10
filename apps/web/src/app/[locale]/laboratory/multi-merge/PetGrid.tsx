import { useCallback, useRef, useState } from 'react';
import { css } from '_panda/css';
import { useSelectionContainer } from '@air/react-drag-to-select';

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
  overflowY: 'auto',
  padding: '0 32px 24px',
});

const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '8px',
  '@media (min-width: 640px)': {
    gridTemplateColumns: 'repeat(10, 1fr)',
  },
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(13, 1fr)',
  },
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

// 드래그 선택을 위한 스타일
const dragSelectContainerStyle = css({
  position: 'relative',
  width: '100%',
  height: '100%',
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingPetIds, setDraggingPetIds] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleSelectionStart = useCallback(() => {
    setIsDragging(true);
    setDraggingPetIds([]);
  }, []);

  const handleSelectionChange = useCallback(
    (box: { left: number; top: number; width: number; height: number }) => {
      // 타겟이 선택된 경우에만 다중 선택 허용
      if (!targetPet || !containerRef.current || !isDragging) return;

      const selectedElements = containerRef.current.querySelectorAll('[data-pet-id]');
      const draggedPetIds: string[] = [];

      selectedElements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        // 박스와 요소가 교차하는지 확인
        const boxRight = box.left + box.width;
        const boxBottom = box.top + box.height;

        if (box.left < rect.right && boxRight > rect.left && box.top < rect.bottom && boxBottom > rect.top) {
          const petId = element.getAttribute('data-pet-id');
          if (petId && petId !== targetPet.id) {
            draggedPetIds.push(petId);
          }
        }
      });

      // 드래그 중인 펫들만 내부 상태로 업데이트 (실제 재료는 변경하지 않음)
      setDraggingPetIds(draggedPetIds);
    },
    [targetPet, isDragging],
  );

  const handleSelectionEnd = useCallback(() => {
    if (!targetPet || draggingPetIds.length === 0) {
      setIsDragging(false);
      setDraggingPetIds([]);
      return;
    }

    // 현재 선택된 펫들의 ID
    const currentSelectedIds = pets
      .filter((pet) => materialPets.some((material) => material.id === pet.id))
      .map((pet) => pet.id);

    // 드래그된 영역의 펫들
    const draggedPets = pets.filter((pet) => draggingPetIds.includes(pet.id));

    // 토글 로직 구현
    let newMaterialPets: Persona[];

    // 드래그된 영역의 모든 펫이 현재 선택되어 있는지 확인
    const allDraggedPetsSelected = draggedPets.every((pet) => currentSelectedIds.includes(pet.id));

    if (allDraggedPetsSelected && draggedPets.length > 0) {
      // 모든 드래그된 펫이 선택되어 있으면 → 해제
      newMaterialPets = materialPets.filter((material) => !draggingPetIds.includes(material.id));
    } else {
      // 일부만 선택되어 있거나 선택되지 않은 상태면 → 모두 선택
      const newSelectedIds = [...new Set([...currentSelectedIds, ...draggingPetIds])];
      newMaterialPets = pets.filter((pet) => newSelectedIds.includes(pet.id));
    }

    // 드래그가 끝났을 때만 실제 재료에 반영
    onMultiplePetSelect(newMaterialPets);

    // 드래그 상태 초기화
    setIsDragging(false);
    setDraggingPetIds([]);
  }, [targetPet, draggingPetIds, pets, materialPets, onMultiplePetSelect]);

  const { DragSelection } = useSelectionContainer({
    onSelectionStart: handleSelectionStart,
    onSelectionChange: handleSelectionChange,
    onSelectionEnd: handleSelectionEnd,
    isEnabled: !!targetPet, // 타겟이 선택된 경우에만 드래그 선택 활성화
    selectionProps: {
      style: {
        background: 'rgba(0, 123, 255, 0.1)',
        border: '1px solid rgba(0, 123, 255, 0.3)',
        borderRadius: '4px',
      },
    },
  });

  return (
    <div className={petsGridStyle}>
      <div ref={containerRef} className={dragSelectContainerStyle}>
        <DragSelection />
        <div className={gridStyle}>
          {pets.map((pet) => {
            const selected = isSelected(pet.id);
            const isDraggingThisPet = draggingPetIds.includes(pet.id);
            return (
              <div
                key={pet.id}
                data-pet-id={pet.id}
                className={`${petCardStyle} ${selected ? petCardSelectedStyle : ''} ${isDraggingThisPet ? petCardSelectedStyle : ''}`}
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
          })}
        </div>
      </div>
    </div>
  );
}
