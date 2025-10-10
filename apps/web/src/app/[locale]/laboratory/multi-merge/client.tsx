'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';
import { X } from 'lucide-react';

type Persona = {
  id: string;
  type: string;
  level: string;
  visible: boolean;
  dropRate: string;
  grade: 'DEFAULT' | 'EVOLUTION' | 'COLLABORATOR';
  isEvolutionable?: boolean;
};

// 샘플 펫 데이터
const samplePets: Persona[] = [
  { id: '1', type: 'CAT', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '2', type: 'DOG', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '3', type: 'MOUSE', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '4', type: 'HAMSTER', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '5', type: 'RABBIT', level: '64', visible: true, dropRate: '0.05', grade: 'EVOLUTION', isEvolutionable: true },
  { id: '6', type: 'BEAR', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '7', type: 'PANDA', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '8', type: 'KOALA', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '9', type: 'TIGER', level: '72', visible: true, dropRate: '0.03', grade: 'EVOLUTION', isEvolutionable: true },
  { id: '10', type: 'LION', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '11', type: 'COW', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '12', type: 'PIG', level: '64', visible: true, dropRate: '0.05', grade: 'EVOLUTION' },
  { id: '13', type: 'FROG', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '14', type: 'MONKEY', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '15', type: 'CHICKEN', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '16', type: 'FOX', level: '65', visible: true, dropRate: '0.02', grade: 'COLLABORATOR' },
  { id: '17', type: 'WOLF', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '18', type: 'RACCOON', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '19', type: 'HORSE', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '20', type: 'UNICORN', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '21', type: 'BEE', level: '65', visible: true, dropRate: '0.02', grade: 'COLLABORATOR' },
  { id: '22', type: 'BUG', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '23', type: 'BUTTERFLY', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '24', type: 'SNAIL', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
];

// 타입에 따른 이모지 매핑
const getEmojiByType = (type: string): string => {
  const emojiMap: Record<string, string> = {
    CAT: '🐱',
    DOG: '🐶',
    MOUSE: '🐭',
    HAMSTER: '🐹',
    RABBIT: '🐰',
    BEAR: '🐻',
    PANDA: '🐼',
    KOALA: '🐨',
    TIGER: '🐯',
    LION: '🦁',
    COW: '🐮',
    PIG: '🐷',
    FROG: '🐸',
    MONKEY: '🐵',
    CHICKEN: '🐔',
    FOX: '🦊',
    WOLF: '🐺',
    RACCOON: '🦝',
    HORSE: '🐴',
    UNICORN: '🦄',
    BEE: '🐝',
    BUG: '🐛',
    BUTTERFLY: '🦋',
    SNAIL: '🐌',
  };
  return emojiMap[type] || '❓';
};

// Panda CSS 스타일 클래스들
const modalOverlayStyle = css({
  position: 'fixed',
  inset: '0',
  background: 'black.black_95',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  zIndex: 'modal',
});

const modalContainerStyle = css({
  background: 'black.black_100',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '80rem',
  maxHeight: '95vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

const headerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px 32px',
});

const titleStyle = css({
  fontSize: '30px',
  fontWeight: 'bold',
  color: 'white.white_100',
});

const closeButtonStyle = css({
  color: 'gray.gray_400',
  transition: 'colors',
  cursor: 'pointer',
  _hover: {
    color: 'white.white_100',
  },
});

const contentSectionStyle = css({
  padding: '24px 32px',
});

const mergeSlotsContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: '24px',
});

const slotContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const slotStyle = css({
  width: '96px',
  height: '96px',
  background: 'gray.gray_200',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid',
  borderColor: 'gray.gray_300',
});

const slotLabelStyle = css({
  color: 'gray.gray_400',
  fontSize: '14px',
  marginTop: '8px',
});

const operatorStyle = css({
  fontSize: '24px',
  color: 'gray.gray_500',
  marginBottom: '24px',
});

const selectionSummaryStyle = css({
  background: 'gray.gray_250',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '16px',
});

const summaryHeaderStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '12px',
});

const summaryTextStyle = css({
  color: 'white.white_100',
  fontSize: '14px',
});

const clearButtonStyle = css({
  fontSize: '12px',
  color: 'gray.gray_400',
  transition: 'colors',
  cursor: 'pointer',
  _hover: {
    color: 'white.white_100',
  },
});

const selectedPetsContainerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

const selectedPetItemStyle = css({
  position: 'relative',
  width: '40px',
  height: '40px',
  background: 'gray.gray_200',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid',
  borderColor: 'brand.sky',
  cursor: 'pointer',
  transition: 'colors',
  _hover: {
    borderColor: 'brand.sky_light',
  },
});

const petIndexStyle = css({
  position: 'absolute',
  top: '-4px',
  right: '-4px',
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
});

const mergeButtonStyle = css({
  width: '100%',
  padding: '16px',
  background: 'gray.gray_400',
  color: 'gray.gray_600',
  fontWeight: 'bold',
  borderRadius: '12px',
  fontSize: '18px',
  transition: 'all',
  cursor: 'pointer',
  _hover: {
    background: 'gray.gray_300',
  },
  _disabled: {
    background: 'gray.gray_300',
    color: 'gray.gray_500',
    cursor: 'not-allowed',
    _hover: {
      background: 'gray.gray_300',
    },
  },
});

const instructionTextStyle = css({
  padding: '0 32px 16px',
});

const instructionStyle = css({
  color: 'gray.gray_400',
  fontSize: '14px',
  textAlign: 'center',
});

const filterSectionStyle = css({
  padding: '0 32px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '12px',
});

const selectStyle = css({
  background: 'gray.gray_200',
  color: 'gray.gray_400',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  border: '1px solid',
  borderColor: 'gray.gray_300',
  outline: 'none',
  _focus: {
    borderColor: 'gray.gray_400',
  },
});

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

function PetMergeUI() {
  const [targetPet, setTargetPet] = useState<Persona | null>(null);
  const [materialPets, setMaterialPets] = useState<Persona[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handlePetClick = (pet: Persona) => {
    if (!targetPet) {
      // 타겟이 없으면 타겟으로 설정
      setTargetPet(pet);
      setMaterialPets([]); // 재료 초기화
    } else if (pet.id === targetPet.id) {
      // 같은 펫을 클릭하면 타겟 해제
      setTargetPet(null);
      setMaterialPets([]);
    } else {
      // 재료로 추가/제거
      setMaterialPets((prev) => {
        const isSelected = prev.some((p) => p.id === pet.id);
        if (isSelected) {
          return prev.filter((p) => p.id !== pet.id);
        } else {
          return [...prev, pet];
        }
      });
    }
  };

  const handleClearAll = () => {
    setTargetPet(null);
    setMaterialPets([]);
  };

  const totalLevel = materialPets.reduce((sum, pet) => sum + parseInt(pet.level), 0);
  const resultLevel = targetPet && materialPets.length > 0 ? parseInt(targetPet.level) + totalLevel + 1 : 0;

  const isSelected = (petId: string) => {
    if (petId === targetPet?.id) return 'target';
    return materialPets.some((p) => p.id === petId) ? 'material' : false;
  };

  // 타겟이 선택된 경우 리스트에서 제외
  const availablePets = samplePets.filter((pet) => pet.visible && pet.id !== targetPet?.id);

  if (!isModalOpen) return null;

  return (
    <div className={modalOverlayStyle}>
      <div className={modalContainerStyle}>
        {/* Header */}
        <div className={headerStyle}>
          <h2 className={titleStyle}>Merge Persona Level</h2>
          <button className={closeButtonStyle} onClick={() => setIsModalOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Merge Slots Section */}
        <div className={contentSectionStyle}>
          <div className={mergeSlotsContainerStyle}>
            {/* Target Slot */}
            <div className={slotContainerStyle}>
              <div className={slotStyle}>
                {targetPet ? (
                  <span style={{ fontSize: '48px' }}>{getEmojiByType(targetPet.type)}</span>
                ) : (
                  <span style={{ fontSize: '60px', color: '#6b7280' }}>?</span>
                )}
              </div>
              <span className={slotLabelStyle}>{targetPet ? `Level ${targetPet.level}` : 'Target Pet'}</span>
            </div>

            <span className={operatorStyle}>+</span>

            {/* Material Slot - Shows count of material pets */}
            <div className={slotContainerStyle}>
              <div className={slotStyle}>
                {materialPets.length > 0 ? (
                  <div
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <span style={{ fontSize: '24px', color: '#60a5fa', fontWeight: 'bold' }}>
                      {materialPets.length}
                    </span>
                    <span style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>materials</span>
                  </div>
                ) : (
                  <span style={{ fontSize: '60px', color: '#6b7280' }}>?</span>
                )}
              </div>
              <span className={slotLabelStyle}>
                {materialPets.length > 0 ? `Total Lv. ${totalLevel}` : 'Materials'}
              </span>
            </div>

            <span className={operatorStyle}>=</span>

            {/* Result Slot */}
            <div className={slotContainerStyle}>
              <div className={slotStyle}>
                {targetPet && materialPets.length > 0 ? (
                  <span style={{ fontSize: '32px', color: '#4ade80', fontWeight: 'bold' }}>✨</span>
                ) : (
                  <span style={{ fontSize: '60px', color: '#6b7280' }}>?</span>
                )}
              </div>
              <span className={slotLabelStyle}>
                {targetPet && materialPets.length > 0 ? `Level ${resultLevel}` : 'Result'}
              </span>
            </div>
          </div>

          {/* Selection Summary */}
          {(targetPet || materialPets.length > 0) && (
            <div className={selectionSummaryStyle}>
              <div className={summaryHeaderStyle}>
                <span className={summaryTextStyle}>
                  {targetPet ? 'Target' : 'No Target'} • Materials:{' '}
                  <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>{materialPets.length}</span>
                </span>
                <button className={clearButtonStyle} onClick={handleClearAll}>
                  Clear All
                </button>
              </div>
              <div className={selectedPetsContainerStyle}>
                {targetPet && (
                  <div
                    className={selectedPetItemStyle}
                    onClick={() => handlePetClick(targetPet)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handlePetClick(targetPet);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    title={`Target: ${targetPet.type} Lv.${targetPet.level}`}
                    style={{ borderColor: '#ef4444' }}
                  >
                    <span style={{ fontSize: '20px' }}>{getEmojiByType(targetPet.type)}</span>
                    <div className={petIndexStyle} style={{ background: '#ef4444' }}>
                      T
                    </div>
                  </div>
                )}
                {materialPets.map((pet, index) => (
                  <div
                    key={pet.id}
                    className={selectedPetItemStyle}
                    onClick={() => handlePetClick(pet)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handlePetClick(pet);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    title={`Material: ${pet.type} Lv.${pet.level}`}
                  >
                    <span style={{ fontSize: '20px' }}>{getEmojiByType(pet.type)}</span>
                    <div className={petIndexStyle}>{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Merge Button */}
          <button className={mergeButtonStyle} disabled={!targetPet || materialPets.length === 0}>
            {!targetPet
              ? 'Select Target Pet'
              : materialPets.length === 0
                ? 'Select Materials'
                : `Merge ${materialPets.length + 1} Pets`}
          </button>
        </div>

        {/* Instruction Text */}
        <div className={instructionTextStyle}>
          <p className={instructionStyle}>
            {!targetPet
              ? 'First, select a target pet to level up.'
              : materialPets.length === 0
                ? 'Now select material pets to merge with the target.'
                : `${materialPets.length} materials selected. Click pets to deselect or click Merge to continue.`}
          </p>
        </div>

        {/* Filter Section */}
        <div className={filterSectionStyle}>
          <select className={selectStyle}>
            <option>Price</option>
            <option>Level</option>
            <option>Name</option>
          </select>
          <select className={selectStyle}>
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </div>

        {/* Pets Grid */}
        <div className={petsGridStyle}>
          <div className={gridStyle}>
            {availablePets.map((pet) => {
              const selected = isSelected(pet.id);
              return (
                <div
                  key={pet.id}
                  className={`${petCardStyle} ${selected ? petCardSelectedStyle : ''}`}
                  onClick={() => handlePetClick(pet)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePetClick(pet);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {selected && <div className={checkIconStyle}>✓</div>}
                  <span style={{ fontSize: '24px', marginBottom: '4px' }}>{getEmojiByType(pet.type)}</span>
                  <span className={petLevelStyle}>Lv.{pet.level}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetMergeUI;
