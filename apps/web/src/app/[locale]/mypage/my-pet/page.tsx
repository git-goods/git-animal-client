'use client';

import React, { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { type Persona } from '@gitanimals/api';
import { ScrollArea } from '@gitanimals/ui-panda';

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
    <div className={flex({ flexDir: 'column' })}>
      <SelectedPetTable currentPersona={selectPersona} reset={() => setSelectPersona(null)} />
      <section className={selectPetContainerStyle}>
        <h2 className="heading">{t('pet-list')}</h2>

        <ScrollArea height="calc(100vh - 424px)">
          <SelectPersonaList
            selectPersona={selectPersona ? [selectPersona.id] : []}
            onSelectPersona={(persona) => setSelectPersona(persona)}
            initSelectPersonas={initSelectPersonas}
            isSpecialEffect
          />
        </ScrollArea>
      </section>

      <p className={captionMessageStyle}>{t('sell-to-other')}</p>
    </div>
  );
}

export default MypageMyPets;

const captionMessageStyle = css({
  textStyle: 'glyph18.regular',
  color: 'white_75',
  marginTop: '16px',

  // 안내 멘트 5초 뒤에 등장
  opacity: 0,
  animation: `fadeIn 0.5s ease-in-out 5s forwards`,
});

const selectPetContainerStyle = css({
  position: 'relative',

  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
    marginBottom: '16px',
  },
});
