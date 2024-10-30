'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';

import { FarmPersonaSelect } from './FarmPersonaSelect';
import { FarmPreview } from './FarmPreview';

function FarmType() {
  const [selectPersona, setSelectPersona] = useState<string[]>([]);

  return (
    <>
      <section className={farmSectionStyle}>
        <FarmPersonaSelect selectPersona={selectPersona} setSelectPersona={setSelectPersona} />
        <FarmPreview selectPersona={selectPersona} loading={true} />
      </section>
    </>
  );
}

export default FarmType;

const farmSectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  padding: '40px 0',
});
