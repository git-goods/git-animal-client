'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { type Persona } from '@gitanimals/api';

import { customScrollStyle } from '@/styles/scrollStyle';

import { SelectPersonaList } from './PersonaList';
import { SelectedPetTable } from './SelectedPetTable';

function MypageMyPets() {
  const t = useTranslations('Mypage');
  const [selectPersona, setSelectPersona] = useState<Persona | null>(null);

  return (
    <>
      <SelectedPetTable currentPersona={selectPersona} reset={() => setSelectPersona(null)} />
      <section className={selectPetContainerStyle}>
        <h2 className="heading">{t('pet-list')}</h2>

        <div className={listStyle}>
          <SelectPersonaList
            selectPersona={selectPersona ? [selectPersona.id] : []}
            onSelectPersona={(persona) => setSelectPersona(persona)}
            initSelectPersonas={(list) => {
              if (!selectPersona) {
                setSelectPersona(list[0]);
              }
            }}
          />
        </div>
      </section>

      <p className={captionMessageStyle}>{t('sell-to-other')}</p>
    </>
  );
}

export default MypageMyPets;

const listStyle = cx(
  flex({
    overflow: 'auto',
    w: '100%',
    h: '100%',
    minH: '0',
    overflowY: 'auto',
    gap: '4px',
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    minHeight: 0, // ← 핵심: flex 자식이 수축 가능하도록
  }),
  customScrollStyle,
);

const captionMessageStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white_75',
  marginTop: '4px',
  pb: '8px',

  // 안내 멘트 5초 뒤에 등장
  opacity: 0,
  animation: `fadeIn 0.5s ease-in-out 5s forwards`,
});

const selectPetContainerStyle = css({
  position: 'relative',
  flex: 1,
  minHeight: 0, // ← 핵심: flex 자식이 수축 가능하도록
  overflowY: 'auto',
  display: 'flex',
  flexDir: 'column',
  pt: '28px',

  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
    marginBottom: '8px',
  },
});
