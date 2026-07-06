/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import type { Persona } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-tailwind';

import { GuildSelectPersonaList } from './GuildSelectPersonaList';

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
      <GuildSelectPersonaList selectPersona={selectPersona ? [selectPersona] : []} onSelectPersona={onSelectPersona} />
      <Button className="mx-auto w-[100px]" onClick={onDone} disabled={!selectPersona}>
        Done
      </Button>
    </>
  );
};
