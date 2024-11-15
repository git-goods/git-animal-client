'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { center, flex } from '_panda/patterns';
import { dropPet, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { customScrollStyle } from '@/styles/scrollStyle';
import { ANIMAL_TIER_TEXT_MAP, getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

import { SelectPersonaList } from '../PersonaList';

import { MergePersona } from './(merge)';

function MypageMyPets() {
  const t = useTranslations('Mypage');
  const [selectPersona, setSelectPersona] = useState<Persona | null>(null);

  return (
    <>
      <div className={cx(subStyle, flex({ flexDir: 'column' }))}>
        <SelectedPetTable currentPersona={selectPersona} reset={() => setSelectPersona(null)} />
        <section className={selectPetContainerStyle}>
          <h2 className="heading">{t('pet-list')}</h2>

          <div className={listStyle}>
            <SelectPersonaList
              selectPersona={selectPersona ? [selectPersona.id] : []}
              onSelectPersona={(persona) => setSelectPersona(persona)}
              initSelectPersonas={(list) => {
                setSelectPersona(list[0]);
              }}
            />
          </div>
        </section>
        <p className={captionMessageStyle}>{t('sell-to-other')}</p>
      </div>
      <div className={noticeStyle}>{t('no-mobile-support')}</div>
    </>
  );
}

export default MypageMyPets;

const listStyle = cx(
  flex({
    maxHeight: 'calc(100vh - 542px)',
    overflow: 'auto',
    gap: 4,
    w: '100%',
    h: '100%',
    minH: '0',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }),
  customScrollStyle,
);
const subStyle = css({
  _mobile: {
    display: 'none',
  },
});

const noticeStyle = center({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: '#019c5a',
  color: 'white',
  zIndex: 1000,
  display: 'none',
  textStyle: 'glyph24.bold',
  whiteSpace: 'pre-wrap',
  lineHeight: '1.5',
  textAlign: 'center',
  _mobile: {
    display: 'flex',
  },
});

const captionMessageStyle = css({
  textStyle: 'glyph18.regular',
  color: 'white_75',
  marginTop: 16,

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

interface SelectedPetTableProps {
  currentPersona: Persona | null;
  reset: () => void;
}

function SelectedPetTable({ currentPersona, reset }: SelectedPetTableProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('Shop');
  const [isMergeOpen, setIsMergeOpen] = useState(false);

  const { mutate: dropPetMutation } = useMutation({
    mutationFn: (personaId: string) => dropPet({ personaId }),
    onSuccess: (data) => {
      toast.success((t('pet-sold') as string).replace('[money]', data.givenPoint.toString()));
      queryClient.invalidateQueries({ queryKey: userQueries.allKey() });
      reset();
    },
    onError: () => {
      toast.error(t('sell-product-fail'));
    },
  });

  const onSellClick = async () => {
    if (!currentPersona) return;
    dropPetMutation(currentPersona.id);
  };

  return (
    <div className={tableCss}>
      <div className={theadCss}>
        <span>{t('pet')}</span>
        <span>{t('name')}</span>
        <span>{t('grade')}</span>
        <span>{t('level')}</span>
        <span></span>
      </div>

      <div className={cx(rowStyle, 'row')}>
        {currentPersona && (
          <>
            <div>
              <Image src={getPersonaImage(currentPersona.type)} alt={currentPersona.type} width={60} height={67} />
            </div>
            <div>{snakeToTitleCase(currentPersona.type)}</div>
            <div>{ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(currentPersona.dropRate.replace('%', '')))]}</div>
            <div>{currentPersona.level}</div>
            <div></div>
            <div className={flex({ gap: 8 })}>
              <Button variant="secondary" onClick={onSellClick}>
                100P {t('sell')}
              </Button>
              {/* TODO: 합치기 기능 추가 시*/}
              <Button variant="secondary" onClick={() => setIsMergeOpen(true)}>
                {t('merge')}
              </Button>
            </div>
          </>
        )}
      </div>
      {currentPersona && (
        <MergePersona isOpen={isMergeOpen} onClose={() => setIsMergeOpen(false)} targetPersona={currentPersona} />
      )}
    </div>
  );
}

const tableCss = css({
  width: '100%',
  marginBottom: 32,
});

const theadCss = css({
  display: 'grid',
  gridTemplateColumns: '1fr 2.5fr 1fr 1fr 2.2fr 3.5fr',
  gap: 16,
  padding: '4px 32px',
  borderRadius: '12px',
  backgroundColor: 'white_50',
  alignItems: 'center',

  height: 46,
  textStyle: 'glyph18.bold',
  color: 'white_100',

  '& > span:nth-child(1)': {
    textAlign: 'center',
  },

  marginBottom: 4,
});

const rowStyle = css({
  width: '100%',
  height: 80,
  backgroundColor: 'white_10',
  borderRadius: 12,

  display: 'grid',
  gridTemplateColumns: '1fr 2.5fr 1fr 1fr 2.2fr 3.5fr',
  alignItems: 'center',
  padding: '0 32px',
  gap: 16,

  textStyle: 'glyph20.regular',
  color: 'white.white_100',

  '& button': {
    color: 'black.black',
    width: '100%',
    paddingX: 6,
  },

  '& *': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
