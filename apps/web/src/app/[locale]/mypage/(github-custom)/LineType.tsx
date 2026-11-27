'use client';

import React, { useState } from 'react';

import { LinePersonaSelect } from './LinePersonaSelect';
import { LinePreview } from './LinePreview';
import { useMypageTour } from './useMypageTour';

export function LineType() {
  const [selectPersona, setSelectPersona] = useState<string | null>(null);
  useMypageTour('line');

  return (
    <>
      <LinePreview selectPersona={selectPersona} />
      <div data-tour="pet">
        <LinePersonaSelect selectPersona={selectPersona} onChangePersona={(personaId) => setSelectPersona(personaId)} />
      </div>
    </>
  );
}
