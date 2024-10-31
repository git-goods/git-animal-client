'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { FullModal } from '@gitanimals/ui-panda';
import { ExpandIcon } from 'lucide-react';

import { personaListScrollStyle, SelectPersonaList } from '../PersonaList';

interface Props {
  selectPersona: string | null;
  onChangePersona: (personaId: string) => void;
}

export const LinePersonaSelect = ({ selectPersona, onChangePersona }: Props) => {
  const t = useTranslations('Mypage');

  const [isExtend, setIsExtend] = useState<boolean>(false);

  return (
    <div>
      <section className={selectPetContainerStyle}>
        <h2 className="heading">{t('change-pet')}</h2>
        <button onClick={() => setIsExtend(true)}>
          <ExpandIcon color="white" size={20} />
        </button>
      </section>
      <section className={listStyle}>
        <SelectPersonaList
          selectPersona={selectPersona ? [selectPersona] : []}
          onSelectPersona={(persona) => onChangePersona(persona.id)}
        />
      </section>
      <FullModal isOpen={isExtend} onClose={() => setIsExtend(false)}>
        <FullModal.CloseButton onClose={() => setIsExtend(false)} />
        <FullModal.Content>
          <FullModal.Heading>{t('line-type-select-pet')}</FullModal.Heading>
          <div className={flexOverflowStyle}>
            <SelectPersonaList
              selectPersona={selectPersona ? [selectPersona] : []}
              onSelectPersona={(persona) => onChangePersona(persona.id)}
            />
          </div>
        </FullModal.Content>
      </FullModal>
    </div>
  );
};

const flexOverflowStyle = css({
  display: 'flex',
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
  gap: 4,
  height: '100%',
  minHeight: '0',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxHeight: 'calc(100% - 100px)',
});

const listStyle = cx(
  flex({
    gap: 4,
    w: '100%',
    h: '100%',
    minH: '0',
    overflowX: 'auto',
    overflowY: 'hidden',
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridAutoColumns: 'max-content',
    gridAutoFlow: 'column',
  }),
  personaListScrollStyle,
);

const selectPetContainerStyle = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',

  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
  },
});
