'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import type { MergePersonaLevelResponse, Persona } from '@gitanimals/api';
import { useMergePersonaLevelByToken, userQueries } from '@gitanimals/react-query';
import { Button, Dialog } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';

import { useClientSession } from '@/utils/clientAuth';

import { SelectPersonaList } from '../../PersonaList';
import { SpinningLoader } from '../_components/SpinningLoader';

import { EvolutionPreview } from './EvolutionPreview';
import { MergeResultModal } from './MergeResult';

interface EvolutionPersonaProps {
  isOpen: boolean;
  onClose: () => void;
  targetPersona: Persona;
}

export function EvolutionPersona({ isOpen, onClose, targetPersona }: EvolutionPersonaProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage.Merge');

  const [resultData, setResultData] = useState<MergePersonaLevelResponse | null>(null);

  const [materialPersona, setMaterialPersona] = useState<Persona | null>(null);

  const session = useClientSession();
  const token = session.data?.user.accessToken as string;
  const isMergeDisabled = !materialPersona || !targetPersona;
  const selectPersona = [targetPersona.id, materialPersona?.id].filter(Boolean) as string[];

  const { mutate: mergePersonaLevel, isPending: isMerging } = useMergePersonaLevelByToken(token, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
    },
  });

  const onMergeAction = () => {
    if (!targetPersona?.id || !materialPersona?.id) {
      return;
    }

    mergePersonaLevel({
      increasePersonaId: targetPersona.id,
      deletePersonaId: materialPersona.id,
    });
  };

  const onSelectPersona = (currentSelectPersona: Persona) => {
    if (currentSelectPersona.id === targetPersona.id) {
      setMaterialPersona(null);
    } else {
      setMaterialPersona(currentSelectPersona);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content size="large">
        <Dialog.Title className={headingStyle}>Merge to Level Up</Dialog.Title>
        <EvolutionPreview targetPersona={targetPersona} materialPersona={materialPersona} />

        <SelectPersonaList selectPersona={selectPersona} onSelectPersona={onSelectPersona} />

        <Dialog.Footer className={footerStyle}>
          <Button variant="secondary" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button disabled={isMergeDisabled} onClick={onMergeAction}>
            {t('merge')}
          </Button>
        </Dialog.Footer>
        <MergeResultModal
          key={resultData?.id}
          isOpen={Boolean(resultData)}
          onClose={() => setResultData(null)}
          result={resultData as MergePersonaLevelResponse}
        />
        {isMerging && <SpinningLoader />}
      </Dialog.Content>
    </Dialog>
  );
}

const headingStyle = css({ marginTop: '40px' });
const footerStyle = css({ display: 'flex', justifyContent: 'center', gap: '12px' });
