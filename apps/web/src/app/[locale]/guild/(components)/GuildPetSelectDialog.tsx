/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import type { Persona } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';

import { SelectPersonaList } from '../../mypage/PersonaList';

export const GuildJoinPetSelectDialog = ({ onSubmit }: { onSubmit: (selectPersona: string) => void }) => {
  const [selectPersona, setSelectPersona] = useState<string>();

  const onSelectPersona = (currentSelectPersona: Persona) => {
    setSelectPersona(currentSelectPersona.id);
  };

  const onDone = () => {
    if (selectPersona) {
      onSubmit(selectPersona);
    }
  };

  return (
    <>
      <SelectPersonaList selectPersona={selectPersona ? [selectPersona] : []} onSelectPersona={onSelectPersona} />
      <Button mx="auto" w="100px" onClick={onDone} disabled={!selectPersona}>
        Done
      </Button>
    </>
  );
};
