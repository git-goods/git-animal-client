'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';
import { flex } from '_panda/patterns';
import { dropPet, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, Table } from '@gitanimals/ui-panda';
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
    <div className={flex({ flexDir: 'column' })}>
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
    maxHeight: 'calc(100vh - 542px)',
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
    <Table className={tableCss}>
      <Table.Header>
        <Table.Row>
          <Table.Head>{t('pet')}</Table.Head>
          <Table.Head>{t('name')}</Table.Head>
          <Table.Head>{t('grade')}</Table.Head>
          <Table.Head>{t('level')}</Table.Head>
          <Table.Head></Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {currentPersona ? (
          <Table.Row>
            <Table.Cell paddingLeft={6}>
              <Image src={getPersonaImage(currentPersona.type)} alt={currentPersona.type} width={60} height={67} />
            </Table.Cell>
            <Table.Cell>{snakeToTitleCase(currentPersona.type)}</Table.Cell>
            <Table.Cell>
              {ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(currentPersona.dropRate.replace('%', '')))]}
            </Table.Cell>
            <Table.Cell>{currentPersona.level}</Table.Cell>
            <Table.Cell className={flex({ gap: '8px', minH: '80px', alignItems: 'center' })}>
              <Button variant="secondary" onClick={onSellClick}>
                100P {t('sell')}
              </Button>
              <Button variant="secondary" onClick={() => setIsMergeOpen(true)}>
                {t('merge')}
              </Button>
            </Table.Cell>
          </Table.Row>
        ) : (
          <Table.Row>
            <Table.Cell colSpan={5}>
              <Flex alignItems="center" justifyContent="center" w="full" h="full">
                Please select a pet.
              </Flex>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>

      {currentPersona && (
        <MergePersona
          key={currentPersona.id}
          isOpen={isMergeOpen}
          onClose={() => setIsMergeOpen(false)}
          targetPersona={currentPersona}
        />
      )}
    </Table>
  );
}

const tableCss = css({
  width: '100%',
  marginBottom: '32px',
});
