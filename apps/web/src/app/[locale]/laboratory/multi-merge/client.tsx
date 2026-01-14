'use client';

import React, { Suspense, useState } from 'react';
import type { MergePersonasResponse } from '@gitanimals/api';
import { mergePersonas, type MergePersonasRequest, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, ScrollArea } from '@gitanimals/ui-tailwind';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { toast } from 'sonner';

import { Link } from '@/i18n/routing';
import { useClientUser } from '@/utils/clientAuth';

import { MergeResultModal } from '../../mypage/my-pet/(merge)/MergeResult';

import { MergeSlots } from './MergeSlots';
import { PetGrid } from './PetGrid';
import { SelectionSummary } from './SelectionSummary';
import { contentSectionStyle, instructionStyle, instructionTextStyle } from './styles';

function PetMergeUI() {
  const queryClient = useQueryClient();

  const [targetPet, setTargetPet] = useState<Persona | null>(null);
  const [materialPets, setMaterialPets] = useState<Persona[]>([]);

  const { mutate: mutateMergePersonas, isPending: isMerging } = useMutation({
    mutationFn: (request: MergePersonasRequest) => mergePersonas(request),
    onSuccess: (data) => {
      setTargetPet(data as Persona);
      setMaterialPets([]);
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });

      overlay.open(({ isOpen, close }) => (
        <MergeResultModal
          key={data.id}
          isOpen={isOpen}
          onClose={() => close()}
          result={data as MergePersonasResponse}
        />
      ));
    },
    onError: () => {
      toast.error('Merge failed');
    },
  });

  const onMergeClick = () => {
    if (!targetPet) return;
    if (materialPets.length === 0) return;

    mutateMergePersonas({
      increasePersonaId: targetPet.id,
      deletePersonaId: materialPets.map((pet) => pet.id),
    });
  };

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

  const calcResultLevel = () => {
    if (!targetPet || !materialPets.length) return { resultLevel: 0, plusLevel: 0 };

    // 재료 레벨이 1 이하면 1로 처리
    // 재료 레벨의 /2 만큼 합쳐진다.
    const materialLevel = materialPets.reduce((sum, pet) => {
      if (parseInt(pet.level) == 0) return sum + 1;
      return sum + Math.floor(Number(pet.level) / 2);
    }, 0);

    const plusLevel = Number(materialLevel) <= 1 ? 1 : materialLevel;
    const resultLevel = Number(targetPet.level) + plusLevel;

    return { resultLevel, plusLevel };
  };

  const { resultLevel, plusLevel } = calcResultLevel();

  return (
    <div>
      <div className={contentSectionStyle}>
        <MergeSlots
          targetPet={targetPet}
          materialPets={materialPets}
          totalLevel={plusLevel}
          resultLevel={resultLevel}
        />

        <SelectionSummary targetPet={targetPet} materialPets={materialPets} onPetClick={handlePetClick} />

        <div className="flex gap-4 justify-center">
          {!targetPet && <Button disabled={!targetPet}>Select Target Pet</Button>}
          {targetPet && materialPets.length === 0 && (
            <Button disabled={targetPet && materialPets.length === 0}>Select Materials</Button>
          )}
          {targetPet && materialPets.length > 0 && (
            <Button disabled={(targetPet && materialPets.length === 0) || isMerging} onClick={onMergeClick}>
              Merge {materialPets.length + 1} Pets
            </Button>
          )}
          {(targetPet || materialPets.length > 0) && (
            <Button variant="secondary" onClick={handleClearAll}>
              Clear All
            </Button>
          )}
          <Button variant="secondary">
            <Link href="/laboratory">Exit</Link>
          </Button>
        </div>
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

      {/* Pets Grid */}
      <Suspense>
        <PetList
          targetPet={targetPet}
          materialPets={materialPets}
          setMaterialPets={setMaterialPets}
          handlePetClick={handlePetClick}
        />
      </Suspense>
    </div>
  );
}

export default PetMergeUI;

function PetList({
  targetPet,
  materialPets,
  setMaterialPets,
  handlePetClick,
}: {
  targetPet: Persona | null;
  materialPets: Persona[];
  setMaterialPets: (pets: Persona[]) => void;
  handlePetClick: (pet: Persona) => void;
}) {
  const { name } = useClientUser();
  const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));

  const availablePets = data.personas.filter((pet) => !pet.visible && pet.id !== targetPet?.id);

  const handleMultiplePetSelect = (pets: Persona[]) => {
    // 타겟이 선택된 경우에만 다중 선택 허용
    if (!targetPet) return;

    // 타겟 펫을 제외한 펫들만 재료로 설정
    const materialPetsOnly = pets.filter((pet) => pet.id !== targetPet.id);
    setMaterialPets(materialPetsOnly);
  };

  const isSelected = (petId: string) => {
    if (petId === targetPet?.id) return 'target';
    return materialPets.some((p) => p.id === petId) ? 'material' : false;
  };

  return (
    <ScrollArea className="h-[calc(100vh-530px)]">
      <PetGrid
        pets={availablePets}
        onPetClick={handlePetClick}
        onMultiplePetSelect={handleMultiplePetSelect}
        isSelected={isSelected}
        targetPet={targetPet}
        materialPets={materialPets}
      />
    </ScrollArea>
  );
}
