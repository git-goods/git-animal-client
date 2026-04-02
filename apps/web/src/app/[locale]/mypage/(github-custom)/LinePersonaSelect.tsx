'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { DialogV2, ScrollArea } from '@gitanimals/ui-tailwind';
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
      <ScrollArea className="h-40">
        <SelectPersonaList
          selectPersona={selectPersona ? [selectPersona] : []}
          onSelectPersona={(persona) => onChangePersona(persona.id)}
        />
      </ScrollArea>
      <DialogV2 open={isExtend} onOpenChange={() => setIsExtend(false)}>
        <DialogV2.Content size="lg">
          <DialogV2.CloseButton />
          <DialogV2.Header>
            <DialogV2.Title>{t('line-type-select-pet')}</DialogV2.Title>
          </DialogV2.Header>
          <SelectPersonaList
            selectPersona={selectPersona ? [selectPersona] : []}
            onSelectPersona={(persona) => onChangePersona(persona.id)}
          >
            <SelectPersonaList.Toolbar showSearch />
            <DialogV2.Body>
              <SelectPersonaList.Grid />
            </DialogV2.Body>
          </SelectPersonaList>
        </DialogV2.Content>
      </DialogV2>
    </div>
  );
};
