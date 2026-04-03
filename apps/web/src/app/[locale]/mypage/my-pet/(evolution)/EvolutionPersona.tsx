'use client';

import { useTranslations } from 'next-intl';
import { evolutionPersona, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, DialogV2 } from '@gitanimals/ui-tailwind';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MoveRight } from 'lucide-react';
import { overlay } from 'overlay-kit';

import { PersonaBanner, PersonaBannerUnknown, PersonaGradientBanner } from '../_components/PersonaBanner';
import { SpinningLoader } from '../_components/SpinningLoader';

import { EvolutionResult } from './EvolutionResult';

interface EvolutionPersonaProps {
  isOpen: boolean;
  onClose: () => void;
  targetPersona: Persona;
}

export function EvolutionPersona({ isOpen, onClose, targetPersona }: EvolutionPersonaProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage');

  const { mutate, isPending: isEvolving } = useMutation({
    mutationFn: () => evolutionPersona(targetPersona.id),
    onSuccess: (data) => {
      overlay.open(({ isOpen, close }) => (
        <EvolutionResult key={data.id} isOpen={isOpen} onClose={() => close()} result={data} />
      ));

      onClose();
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
    },
  });

  const onMergeAction = () => {
    if (!targetPersona) return;
    mutate();
  };

  return (
    <DialogV2 open={isOpen} onOpenChange={onClose}>
      <DialogV2.Content size="lg">
        <DialogV2.CloseButton />
        <DialogV2.Header>
          <DialogV2.Title>GitAnimals Evolution</DialogV2.Title>
        </DialogV2.Header>
        <EvolutionPreview targetPersona={targetPersona} />
        <DialogV2.Footer className="justify-center">
          <Button onClick={onMergeAction}>{t('evolution')}</Button>
        </DialogV2.Footer>
        {isEvolving && <SpinningLoader />}
      </DialogV2.Content>
    </DialogV2>
  );
}

const EvolutionPreview = ({ targetPersona }: { targetPersona: Persona }) => {
  return (
    <div className="relative flex justify-center py-8 px-8 pb-3 overflow-hidden min-h-fit max-mobile:p-0">
      <div className="flex items-center justify-center w-full gap-6">
        {targetPersona ? (
          <PersonaBanner level={targetPersona.level} personaType={targetPersona.type} />
        ) : (
          <PersonaBannerUnknown />
        )}
        <MoveRight width={24} height={24} className="mb-[34px]" color="#FFFFFFBF" />
        <PersonaGradientBanner level={Number(targetPersona.level) - 100 + 1} />
      </div>
    </div>
  );
};
