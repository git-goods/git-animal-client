'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { dropPet, type Persona } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { userQueryKeys } from '@/lib/react-query/user';
import { ANIMAL_TIER_TEXT_MAP, getAnimalTierInfo } from '@/utils/animals';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

import { SelectPersonaList } from '../PersonaList';

function MypageMyPets() {
  const t = useTranslations('Mypage');
  const { name } = useClientUser();
  const [selectPersona, setSelectPersona] = useState<Persona | null>(null);

  return (
    <>
      <SelectedPetTable currentPersona={selectPersona} onReset={() => setSelectPersona(null)} />
      <section className={selectPetContainerStyle}>
        <h2 className="heading">{t('pet-list')}</h2>

        <SelectPersonaList
          name={name}
          selectPersona={selectPersona ? [selectPersona.id] : []}
          onSelectPersona={(persona) => setSelectPersona(persona)}
          isExtend
          initSelectPersonas={(list) => {
            setSelectPersona(list[0]);
          }}
        />
      </section>
    </>
  );
}

export default MypageMyPets;

const selectPetContainerStyle = css({
  position: 'relative',
  height: 'calc(100% - 202px)',
  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
    marginBottom: '16px',
  },
});

function SelectedPetTable({ currentPersona, onReset }: { currentPersona: Persona | null; onReset: () => void }) {
  const queryClient = useQueryClient();
  const t = useTranslations('Shop');

  const { mutate: dropPetMutation } = useMutation({
    mutationFn: (personaId: string) => dropPet({ personaId }),
    onSuccess: (data) => {
      toast.success((t('pet-sold') as string).replace('[money]', data.givenPoint.toString()));
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all() });
      onReset();
    },
    onError: () => {
      toast.error(t('sell-product-fail'));
    },
  });

  const onSellClick = async () => {
    if (!currentPersona) return;
    dropPetMutation(currentPersona.id);
  };

  const onMergeClick = () => {
    console.log('merge');
  };

  return (
    <div className={tableCss}>
      <div className={theadCss}>
        <span>{t('pet')}</span>
        <span>{t('name')}</span>
        <span>{t('grade')}</span>
        <span>{t('level')}</span>
        <span>{t('price')}</span>
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
                {t('sell')}
              </Button>
              {/* TODO: 합치기 기능 추가 시*/}
              <Button variant="secondary" onClick={onMergeClick} disabled>
                {t('prepare')}
              </Button>
            </div>
          </>
        )}
      </div>
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

const tbodyCss = css({
  display: 'flex',
  flexDir: 'column',
  gap: 4,
});
