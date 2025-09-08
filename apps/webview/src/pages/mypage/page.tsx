'use client';

import { useState } from 'react';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { type Persona } from '@gitanimals/api';

import { customScrollStyle } from '@/styles/scrollStyle';

import { SelectPersonaList } from './PersonaList';
import { SelectedPetTable } from './SelectedPetTable';
import { useTranslation } from 'react-i18next';
import { ProfileSection } from './ProfileSection';

function MypageMyPets() {
  const { t } = useTranslation('mypage');
  const [selectPersona, setSelectPersona] = useState<Persona | null>(null);

  return (
    <div className={flex({ flexDir: 'column' })}>
      <ProfileSection />
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
    </div>
  );
}

export default MypageMyPets;

const listStyle = cx(
  flex({
    maxHeight: 'calc(100vh - 446px)',
    overflow: 'auto',
    gap: '4px',
    w: '100%',
    h: '100%',
    minH: '0',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
  }),
  customScrollStyle,
);

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
