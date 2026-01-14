'use client';

import React, { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { type Persona } from '@gitanimals/api';
import { ScrollArea } from '@gitanimals/ui-tailwind';

import { SelectPersonaList } from '../PersonaList';

import { SelectedPetTable } from './SelectedPetTable';

function MypageMyPets() {
  const t = useTranslations('Mypage');
  const [selectPersona, setSelectPersona] = useState<Persona | null>(null);

  const initSelectPersonas = useCallback(
    (list: Persona[]) => {
      if (!selectPersona && list.length > 0) {
        setSelectPersona(list[0]);
      }
    },
    [selectPersona],
  );

  return (
    <div className="flex flex-col">
      <SelectedPetTable currentPersona={selectPersona} reset={() => setSelectPersona(null)} />
      <section
        className={cn(
          'relative',
          '[&_.heading]:font-product [&_.heading]:text-glyph-18 [&_.heading]:font-bold',
          '[&_.heading]:text-white [&_.heading]:mb-4'
        )}
      >
        <h2 className="heading">{t('pet-list')}</h2>

        <ScrollArea className="h-[calc(100vh-424px)]">
          <SelectPersonaList
            selectPersona={selectPersona ? [selectPersona.id] : []}
            onSelectPersona={(persona) => setSelectPersona(persona)}
            initSelectPersonas={initSelectPersonas}
            isSpecialEffect
          />
        </ScrollArea>
      </section>

      <p
        className={cn(
          'font-product text-glyph-18 text-white/75 mt-4',
          'opacity-0 animate-[fadeIn_0.5s_ease-in-out_5s_forwards]'
        )}
      >
        {t('sell-to-other')}
      </p>
    </div>
  );
}

export default MypageMyPets;
