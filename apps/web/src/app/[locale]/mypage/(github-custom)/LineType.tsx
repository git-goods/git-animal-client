'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';

import { LinePersonaSelect } from './LinePersonaSelect';
import { LinePreview } from './LinePreview';

export function LineType() {
  const [selectPersona, setSelectPersona] = useState<string | null>(null);

  return (
    <div className={sectionContainer}>
      <LinePersonaSelect selectPersona={selectPersona} onChangePersona={(personaId) => setSelectPersona(personaId)} />
      <LinePreview selectPersona={selectPersona} />
    </div>
  );
}

const sectionContainer = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxHeight: '100%',
  py: 40,
  gap: 40,

  _mobile: {
    background: 'none',
    maxHeight: 'auto',
    height: 'auto',
    overflowY: 'auto',
    borderRadius: 0,
  },
});
