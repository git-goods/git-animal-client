'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { evolutionPersona, type MergePersonaLevelResponse, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, CommonDialog } from '@gitanimals/ui-panda';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MoveRight } from 'lucide-react';
import { overlay } from 'overlay-kit';

import { PersonaBanner, PersonaBannerUnknown, PersonaGradientBanner } from '../_components/PersonaBanner';
import { SpinningLoader } from '../_components/SpinningLoader';
import { MergeResultModal } from '../(merge)/MergeResult';

import { EvolutionResult } from './EvolutionResult';

interface EvolutionPersonaProps {
  isOpen: boolean;
  onClose: () => void;
  targetPersona: Persona;
}

export function EvolutionPersona({ isOpen, onClose, targetPersona }: EvolutionPersonaProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage');

  const [resultData, setResultData] = useState<MergePersonaLevelResponse | null>(null);

  const { mutate, isPending: isEvolving } = useMutation({
    mutationFn: () => evolutionPersona(targetPersona.id),
    onSuccess: (data) => {
      console.log('data', data);

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
    <CommonDialog isOpen={isOpen} onClose={onClose} title="GitAnimals Evolution" size="large">
      <EvolutionPreview targetPersona={targetPersona} />
      <div className={css({ display: 'flex', justifyContent: 'center' })}>
        <Button onClick={onMergeAction}>{t('evolution')}</Button>
      </div>
      <MergeResultModal
        key={resultData?.id}
        isOpen={Boolean(resultData)}
        onClose={() => setResultData(null)}
        result={resultData as MergePersonaLevelResponse}
      />
      {isEvolving && <SpinningLoader />}
    </CommonDialog>
  );
}

const EvolutionPreview = ({ targetPersona }: { targetPersona: Persona }) => {
  return (
    <div className={containerStyle}>
      <div className={itemContainerStyle}>
        {targetPersona ? (
          <PersonaBanner level={targetPersona.level} personaType={targetPersona.type} />
        ) : (
          <PersonaBannerUnknown />
        )}
        <MoveRight width={24} height={24} className={iconStyle} color="#FFFFFFBF" />
        <PersonaGradientBanner level={Number(targetPersona.level) - 100 + 1} />
      </div>
    </div>
  );
};

const containerStyle = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  padding: '32px 32px 12px',
  overflow: 'hidden',
  minHeight: 'fit-content',

  _mobile: {
    padding: 0,
  },
});

const itemContainerStyle = flex({
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '24px',
});

const iconStyle = css({ marginBottom: '34px' });
