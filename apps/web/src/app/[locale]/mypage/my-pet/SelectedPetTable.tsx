'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';
import { flex } from '_panda/patterns';
import { dropPet, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, Checkbox, Label } from '@gitanimals/ui-panda';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useDialog } from '@/components/Global/useDialog';
import { ANIMAL_TIER_TEXT_MAP, getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

import { tableCss } from '../../shop/AuctionSection/table.styles';

import { MergePersona } from './(merge)';

interface SelectedPetTableProps {
  currentPersona: Persona | null;
  reset: () => void;
}

export function SelectedPetTable({ currentPersona, reset }: SelectedPetTableProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('Shop');
  const [isMergeOpen, setIsMergeOpen] = useState(false);
  const { showDialog } = useDialog();

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
    // dropPetMutation(currentPersona.id);
    showDialog({
      title: `${currentPersona.type} 판매하기`,
      description: (
        <>
          <p>정말로 판매하시겠습니까?</p>
          <Flex alignItems="center" gap="2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </Flex>
        </>
      ),
      onConfirm: () => dropPetMutation(currentPersona.id),
    });
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
            <div className={flex({ gap: '8px' })}>
              <Button variant="secondary" onClick={onSellClick}>
                100P {t('sell')}
              </Button>
              <Button variant="secondary" onClick={() => setIsMergeOpen(true)}>
                {t('merge')}
              </Button>
            </div>
          </>
        )}
      </div>

      {currentPersona && (
        <MergePersona
          key={currentPersona.id}
          isOpen={isMergeOpen}
          onClose={() => setIsMergeOpen(false)}
          targetPersona={currentPersona}
        />
      )}
    </div>
  );
}

const theadCss = css({
  display: 'grid',
  gridTemplateColumns: '1fr 2.5fr 1fr 1fr 5.7fr',
  gap: '16px',
  padding: '4px 32px',
  borderRadius: '12px',
  backgroundColor: 'white_50',
  alignItems: 'center',

  height: '46px',
  textStyle: 'glyph18.bold',
  color: 'white_100',

  '& > span:nth-child(1)': {
    textAlign: 'center',
  },

  marginBottom: '4px',

  _mobile: {
    fontSize: '16px',
  },
});

const rowStyle = css({
  width: '100%',
  height: '80px',
  backgroundColor: 'white_10',
  borderRadius: '12px',

  display: 'grid',
  gridTemplateColumns: '1fr 2.5fr 1fr 1fr 5.7fr',
  alignItems: 'center',
  padding: '0 32px',
  gap: '16px',

  textStyle: 'glyph20.regular',
  color: 'white.white_100',

  '& button': {
    color: 'black.black',
    width: '100%',
    paddingX: '6px',
  },

  '& *': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  _mobile: {
    fontSize: '16px',
  },
});
