'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';

import { useClientUser } from '@/utils/clientAuth';

import { SelectPersonaList } from '../PersonaList';
import { LinePreview } from './LinePreview';

interface Props {}

export function OneType({}: Props) {
  const t = useTranslations('Mypage');

  const { name } = useClientUser();

  const [selectPersona, setSelectPersona] = useState<string | null>();
  const [isExtend, setIsExtend] = useState(false);

  return (
    <section className={sectionStyle}>
      {name && (
        <section className={selectPetContainerStyle}>
          <h2 className="heading">{t('change-pet')}</h2>
          <Button className="extend-button" onClick={() => setIsExtend((prev) => !prev)}>
            {isExtend ? t('shrink-button') : t('extend-button')}
          </Button>

          <div className={selectPersonaListStyle}>
            <SelectPersonaList
              name={name}
              selectPersona={selectPersona ? [selectPersona] : []}
              onSelectPersona={(persona) => setSelectPersona(persona.id)}
              isExtend={isExtend}
            />
          </div>
        </section>
      )}

      {selectPersona && <LinePreview selectPersona={selectPersona} />}
    </section>
  );
}

// TODO: 임시 방편
const selectPersonaListStyle = css({
  maxH: '400px',
  overflowY: 'auto',
  _mobile: {
    maxH: '250px',
  },
});

const selectPetContainerStyle = css({
  position: 'relative',
  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
    marginBottom: '16px',
  },
  '& .extend-button': {
    position: 'absolute',
    top: '-16px',
    right: 0,
  },
});

const sectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  padding: '40px 0',
  _mobile: {
    gap: 28,
    padding: '32px 0',
  },
});
