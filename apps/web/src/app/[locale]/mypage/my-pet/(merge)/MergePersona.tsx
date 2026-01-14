'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { MergePersonaLevelResponse, Persona } from '@gitanimals/api';
import { useMergePersonaLevelByToken, userQueries } from '@gitanimals/react-query';
import { Button, CommonDialog, Dialog } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';

import { useClientSession } from '@/utils/clientAuth';

import { SelectPersonaList } from '../_components/SelectPersonaList';
import { SpinningLoader } from '../_components/SpinningLoader';

import { MergePreview } from './MergePreview';
import { MergeResultModal } from './MergeResult';

interface MergePersonaProps {
  isOpen: boolean;
  onClose: () => void;
  targetPersona: Persona;
}

export function MergePersona({ isOpen, onClose, targetPersona: initTargetPersona }: MergePersonaProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage.Merge');

  const [resultData, setResultData] = useState<MergePersonaLevelResponse | null>(null);

  const [materialPersona, setMaterialPersona] = useState<Persona | null>(null);
  const [targetPersona, setTargetPersona] = useState<Persona>(initTargetPersona);

  const session = useClientSession();
  const token = session.data?.user.accessToken as string;
  const isMergeDisabled = !materialPersona || !targetPersona;
  const selectPersona = [targetPersona.id, materialPersona?.id].filter(Boolean) as string[];

  const { mutate: mergePersonaLevel, isPending: isMerging } = useMergePersonaLevelByToken(token, {
    onSuccess: (data) => {
      setMaterialPersona(null);
      setResultData(data);
      setTargetPersona(data as Persona); // TODO: 타입 확인
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
    <CommonDialog isOpen={isOpen} onClose={onClose} title="Merge to Level Up" size="large">
      <MergePreview targetPersona={targetPersona} materialPersona={materialPersona} />

      <SelectPersonaList selectPersona={selectPersona} onSelectPersona={onSelectPersona} />

      <Dialog.Footer className="flex justify-center gap-3">
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
    </CommonDialog>
  );
}
