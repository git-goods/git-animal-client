'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { MergePersonaLevelResponse, Persona } from '@gitanimals/api';
import { useMergePersonaLevelByToken, userQueries } from '@gitanimals/react-query';
import { Button, DialogV2 } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';

import { useClientSession } from '@/shared/utils/clientAuth';

import { SelectPersonaList } from '../../PersonaList';
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
    <DialogV2 open={isOpen} onOpenChange={onClose}>
      <DialogV2.Content size="full">
        <DialogV2.CloseButton />
        <DialogV2.Header>
          <DialogV2.Title>Merge to Level Up</DialogV2.Title>
        </DialogV2.Header>
        <MergePreview targetPersona={targetPersona} materialPersona={materialPersona} />

        <SelectPersonaList selectPersona={selectPersona} onSelectPersona={onSelectPersona}>
          <SelectPersonaList.Toolbar showSearch />

          <DialogV2.Body scroll={false} className="h-full flex-1">
            <SelectPersonaList.InventoryGrid minRows={2} mode="dialog" />
          </DialogV2.Body>
        </SelectPersonaList>

        <DialogV2.Footer className="justify-center">
          <Button variant="secondary" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button disabled={isMergeDisabled} onClick={onMergeAction}>
            {t('merge')}
          </Button>
        </DialogV2.Footer>
        <MergeResultModal
          key={resultData?.id}
          isOpen={Boolean(resultData)}
          onClose={() => setResultData(null)}
          result={resultData as MergePersonaLevelResponse}
        />
        {isMerging && <SpinningLoader />}
      </DialogV2.Content>
    </DialogV2>
  );
}
