'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Dialog } from '@gitanimals/ui-tailwind';
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
        <h2 className="glyph18-bold text-white">{t('change-pet')}</h2>
        <button onClick={() => setIsExtend(true)}>
          <ExpandIcon color="white" size={20} />
        </button>
      </section>
      <SelectPersonaList
        selectPersona={selectPersona ? [selectPersona] : []}
        onSelectPersona={(persona) => onChangePersona(persona.id)}
      >
        <SelectPersonaList.InventoryGrid rows={2} />
      </SelectPersonaList>
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
              <SelectPersonaList.InventoryGrid rows="auto" minRows={2} />
            </Dialog.Body>
          </SelectPersonaList>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

const selectPetContainerStyle = 'relative flex items-center justify-between mb-[16px]';
