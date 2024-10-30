'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';

import { LinePersonaSelect } from './LinePersonaSelect';
import { LinePreview } from './LinePreview';

interface Props {}

export function OneType({}: Props) {
  const [selectPersona, setSelectPersona] = useState<string | null>(null);

  return (
    <div className={sectionContianer}>
      <LinePersonaSelect selectPersona={selectPersona} onChangePersona={(personaId) => setSelectPersona(personaId)} />
      <LinePreview selectPersona={selectPersona} />
    </div>
  );
}

const sectionContianer = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxHeight: '100%',
  py: 40,

  _mobile: {
    background: 'none',
    maxHeight: 'auto',
    height: 'auto',
    overflowY: 'auto',
    borderRadius: 0,
  },
});
