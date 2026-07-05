'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { type Persona } from '@gitanimals/api';
import { ScrollArea } from '@gitanimals/ui-tailwind';

import { SelectPersonaList } from '../PersonaList';

import { SelectedPetTable } from './SelectedPetTable';

function MypageMyPets() {
  const t = useTranslations('Mypage');
  const [selectPersona, setSelectPersona] = useState<Persona | null>(null);

  const initSelectPersonas = useCallback((list: Persona[]) => {
    setSelectPersona((prev) => (prev ? prev : list[0] ?? null));
  }, []);

  return (
    <div className="flex flex-col">
      <SelectedPetTable currentPersona={selectPersona} reset={() => setSelectPersona(null)} />
      <section className={selectPetContainerStyle}>
        <h2 className="heading">{t('pet-list')}</h2>

        <ScrollArea height="calc(100vh - 424px)">
          <SelectPersonaList
            selectPersona={selectPersona ? [selectPersona.id] : []}
            onSelectPersona={(persona) => setSelectPersona(persona)}
            initSelectPersonas={initSelectPersonas}
            isSpecialEffect
          >
            <SelectPersonaList.Toolbar showSearch showEvolvableFilter />
            <SelectPersonaList.Grid />
          </SelectPersonaList>
        </ScrollArea>
      </section>

      <p className={captionMessageStyle}>{t('sell-to-other')}</p>
    </div>
  );
}

export default MypageMyPets;

// 안내 멘트 5초 뒤에 등장
const captionMessageStyle = 'glyph18-regular text-white-75 mt-[16px] opacity-0 animate-[fadeIn_0.5s_ease-in-out_5s_forwards]';

const selectPetContainerStyle =
  'relative [&_.heading]:glyph18-bold [&_.heading]:text-white [&_.heading]:mb-[16px]';
