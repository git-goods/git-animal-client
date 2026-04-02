'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { DialogV2 } from '@gitanimals/ui-tailwind';
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
      <section
        className={cn(
          'relative flex items-center justify-between mb-4',
          '[&_.heading]:font-product [&_.heading]:text-glyph-18 [&_.heading]:font-bold [&_.heading]:text-white',
        )}
      >
        <h2 className="heading">{t('change-pet')}</h2>
        <button onClick={() => setIsExtend(true)}>
          <ExpandIcon color="white" size={20} />
        </button>
      </section>
      <SelectPersonaList
        selectPersona={selectPersona ? [selectPersona] : []}
        onSelectPersona={(persona) => onChangePersona(persona.id)}
      >
        <SelectPersonaList.InventoryGrid minRows={2} maxRows={3} />
      </SelectPersonaList>
      <DialogV2 open={isExtend} onOpenChange={() => setIsExtend(false)}>
        <DialogV2.Content size="lg" className="h-full">
          <DialogV2.CloseButton />
          <SelectPersonaList
            selectPersona={selectPersona ? [selectPersona] : []}
            onSelectPersona={(persona) => onChangePersona(persona.id)}
          >
            <DialogV2.Header>
              <DialogV2.Title>{t('line-type-select-pet')}</DialogV2.Title>
              <SelectPersonaList.Toolbar showSearch />
            </DialogV2.Header>
            <DialogV2.Body scroll={false} className="h-full flex-1">
              <SelectPersonaList.InventoryGrid minRows={2} mode="dialog" />
            </DialogV2.Body>
          </SelectPersonaList>
        </DialogV2.Content>
      </DialogV2>
    </div>
  );
};
