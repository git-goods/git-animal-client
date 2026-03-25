'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';

import { Dialog, ScrollArea } from '@gitanimals/ui-panda';
import { ExpandIcon } from 'lucide-react';

import { customScrollStyle } from '@/styles/scrollStyle';

import { SelectPersonaList } from '../PersonaList';

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
      <ScrollArea height="160px">
        <SelectPersonaList
          selectPersona={selectPersona ? [selectPersona] : []}
          onSelectPersona={(persona) => onChangePersona(persona.id)}
        />
      </ScrollArea>
      <Dialog open={isExtend} onOpenChange={() => setIsExtend(false)}>
        <Dialog.Content size="large">
          <Dialog.Title>{t('line-type-select-pet')}</Dialog.Title>
          <div className={flexOverflowStyle}>
            <SelectPersonaList
              selectPersona={selectPersona ? [selectPersona] : []}
              onSelectPersona={(persona) => onChangePersona(persona.id)}
            />
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

const flexOverflowStyle = cx(
  css({
    display: 'flex',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    gap: '4px',
    height: '100%',
    minHeight: '0',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxHeight: 'calc(100%)',
    marginTop: '24px',
  }),
  customScrollStyle,
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
