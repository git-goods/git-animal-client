'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';

import { SelectPersonaList } from '../PersonaList';

interface Props {
  selectPersona: string | null;
  onChangePersona: (personaId: string) => void;
}

export const LinePersonaSelect = ({ selectPersona, onChangePersona }: Props) => {
  const t = useTranslations('Mypage');

  const [isExtend, setIsExtend] = useState<boolean>(false);

  return (
    <>
      <section className={selectPetContainerStyle}>
        <h2 className="heading">{t('change-pet')}</h2>
        <Button className="extend-button" onClick={() => setIsExtend((prev) => !prev)}>
          {isExtend ? t('shrink-button') : t('extend-button')}
        </Button>
      </section>
      <section className={isExtend ? flexGrowSectionStyle : ''}>
        <SelectPersonaList
          selectPersona={selectPersona ? [selectPersona] : []}
          onSelectPersona={(persona) => onChangePersona(persona.id)}
          isExtend={isExtend}
        />
      </section>
    </>
  );
};

const flexGrowSectionStyle = css({
  flex: '1',
  minHeight: '0',
  overflow: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
});

const selectPetContainerStyle = css({
  position: 'relative',
  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
    marginBottom: 16,
  },
  '& .extend-button': {
    position: 'absolute',
    top: '-16px',
    right: 0,
  },
});
