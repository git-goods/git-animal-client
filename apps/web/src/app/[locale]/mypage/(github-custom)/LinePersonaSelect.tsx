'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';

import { Dialog, ScrollArea } from '@gitanimals/ui-panda';
import { ExpandIcon } from 'lucide-react';

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
        <Dialog.Content size="large" scrollable>
          <Dialog.Title>{t('line-type-select-pet')}</Dialog.Title>
          <SelectPersonaList
            selectPersona={selectPersona ? [selectPersona] : []}
            onSelectPersona={(persona) => onChangePersona(persona.id)}
          >
            <Dialog.TopSlot>
              <SelectPersonaList.Toolbar showSearch />
            </Dialog.TopSlot>
            <Dialog.Body>
              <SelectPersonaList.Grid />
            </Dialog.Body>
          </SelectPersonaList>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

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
