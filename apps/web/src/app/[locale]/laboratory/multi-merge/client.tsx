'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

import { MergeSlots } from './MergeSlots';
import { PetGrid } from './PetGrid';
import { SelectionSummary } from './SelectionSummary';
import {
  closeButtonStyle,
  contentSectionStyle,
  filterSectionStyle,
  headerStyle,
  instructionStyle,
  instructionTextStyle,
  mergeButtonStyle,
  modalContainerStyle,
  modalOverlayStyle,
  selectStyle,
  titleStyle,
} from './styles';
import type { Persona } from './types';
import { getEmojiByType, samplePets } from './types';

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

  const handleMultiplePetSelect = (pets: Persona[]) => {
    // 타겟이 선택된 경우에만 다중 선택 허용
    if (!targetPet) return;

    // 타겟 펫을 제외한 펫들만 재료로 설정
    const materialPetsOnly = pets.filter((pet) => pet.id !== targetPet.id);
    setMaterialPets(materialPetsOnly);
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
          <MergeSlots
            targetPet={targetPet}
            materialPets={materialPets}
            totalLevel={totalLevel}
            resultLevel={resultLevel}
            getEmojiByType={getEmojiByType}
          />

          <SelectionSummary
            targetPet={targetPet}
            materialPets={materialPets}
            onPetClick={handlePetClick}
            onClearAll={handleClearAll}
            getEmojiByType={getEmojiByType}
          />

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
                ? 'Now select material pets to merge with the target. You can click individual pets or drag to select multiple pets.'
                : `${materialPets.length} materials selected. Click pets to deselect, drag to select more, or click Merge to continue.`}
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
        <PetGrid
          pets={availablePets}
          onPetClick={handlePetClick}
          onMultiplePetSelect={handleMultiplePetSelect}
          isSelected={isSelected}
          getEmojiByType={getEmojiByType}
          targetPet={targetPet}
          materialPets={materialPets}
        />
      </div>
    </div>
  );
}

export default PetMergeUI;
