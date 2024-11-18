'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';

import { LinePersonaSelect } from './LinePersonaSelect';
import { LinePreview } from './LinePreview';

export function LineType() {
  const [selectPersona, setSelectPersona] = useState<string | null>(null);

  return (
    <div className={sectionContainer}>
      <LinePreview selectPersona={selectPersona} />
      <LinePersonaSelect selectPersona={selectPersona} onChangePersona={(personaId) => setSelectPersona(personaId)} />
    </div>
  );
}

const sectionContainer = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxHeight: '100%',
  py: '40px',
  gap: '40px',

  _mobile: {
    background: 'none',
    maxHeight: 'auto',
    height: 'auto',
    overflowY: 'auto',
    borderRadius: 0,
  },
});
