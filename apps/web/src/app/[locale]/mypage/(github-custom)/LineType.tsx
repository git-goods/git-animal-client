'use client';

import React, { useState } from 'react';

import { LinePersonaSelect } from './LinePersonaSelect';
import { LinePreview } from './LinePreview';

export function LineType() {
  const [selectPersona, setSelectPersona] = useState<string | null>(null);

  return (
    <>
      <LinePreview selectPersona={selectPersona} />
      <LinePersonaSelect selectPersona={selectPersona} onChangePersona={(personaId) => setSelectPersona(personaId)} />
    </>
  );
}
