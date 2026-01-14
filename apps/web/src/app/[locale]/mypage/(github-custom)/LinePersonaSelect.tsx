'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { Dialog, ScrollArea } from '@gitanimals/ui-tailwind';
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
      <section
        className={cn(
          'relative flex items-center justify-between mb-4',
          '[&_.heading]:font-product [&_.heading]:text-glyph-18 [&_.heading]:font-bold [&_.heading]:text-white'
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
      <Dialog open={isExtend} onOpenChange={() => setIsExtend(false)}>
        <Dialog.Content size="large">
          <Dialog.Title>{t('line-type-select-pet')}</Dialog.Title>
          <div
            className={cn(
              customScrollStyle,
              'flex overflow-y-auto overflow-x-hidden w-full gap-1',
              'h-full min-h-0 flex-wrap justify-center max-h-full mt-6'
            )}
          >
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
