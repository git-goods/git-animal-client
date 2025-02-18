'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';
import { flex } from '_panda/patterns';
import { dropPet, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, Checkbox, Dialog, Label } from '@gitanimals/ui-panda';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LOCAL_STORAGE_KEY } from '@/constants/storage';
import { ANIMAL_TIER_TEXT_MAP, getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

import { tableCss } from '../../shop/_auction/table.styles';

import { MergePersona } from './(merge)';

interface SelectedPetTableProps {
  currentPersona: Persona | null;
  reset: () => void;
}

export function SelectedPetTable({ currentPersona, reset }: SelectedPetTableProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('Shop');
  const [isMergeOpen, setIsMergeOpen] = useState(false);
  const [sellPersonaId, setSellPersonaId] = useState<string | null>(null);
  const { setDoNotShowAgain, isChecked: isDoNotShowAgain } = useDoNotShowAgain();

  const { mutate: dropPetMutation } = useMutation({
    mutationFn: (personaId: string) => dropPet({ personaId }),
    onSuccess: (data) => {
      toast.success((t('pet-sold') as string).replace('[money]', data.givenPoint.toString()));
      queryClient.invalidateQueries({ queryKey: userQueries.allKey() });
      setSellPersonaId(null);
      reset();
    },
    onError: () => {
      toast.error(t('sell-product-fail'));
    },
  });

  const onSellClick = async () => {
    if (!currentPersona) return;
    if (isDoNotShowAgain) {
      dropPetMutation(currentPersona.id);
    } else {
      setSellPersonaId(currentPersona.id);
    }
  };

  const onSellAction = async (isDoNotShowAgain: boolean) => {
    if (!sellPersonaId) return;
    dropPetMutation(sellPersonaId);
    if (isDoNotShowAgain) {
      setDoNotShowAgain(true);
    }
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
      <SellConfirmDialog
        isOpen={Boolean(sellPersonaId)}
        onConfirm={onSellAction}
        onClose={() => setSellPersonaId(null)}
      />
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

const DO_NOT_SHOW_AGAIN_KEY = LOCAL_STORAGE_KEY.isDoNotShowAgain;

const useDoNotShowAgain = () => {
  const [isChecked, setIsChecked] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(DO_NOT_SHOW_AGAIN_KEY) === 'true';
  });

  const setDoNotShowAgain = useCallback((value: boolean) => {
    setIsChecked(value);
    if (typeof window === 'undefined') return;
    localStorage.setItem(DO_NOT_SHOW_AGAIN_KEY, value.toString());
  }, []);

  return {
    isChecked,
    setDoNotShowAgain,
  };
};

function SellConfirmDialog({
  onConfirm,
  onClose,
  isOpen,
}: {
  onConfirm: (isDoNotShowAgain: boolean) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const [isDoNotShowAgain, setIsDoNotShowAgain] = useState(false);

  const confirmDialog = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await onConfirm(isDoNotShowAgain);
    setIsLoading(false);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content>
        <Dialog.Title>{t('Shop.sell-confirm')}</Dialog.Title>
        <Dialog.Description className={descriptionStyle}>
          <p>{t('Shop.sell-confirm-description')}</p>
        </Dialog.Description>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Flex alignItems="center" gap="2">
            <Checkbox id="do-not-show-again" onClick={() => setIsDoNotShowAgain(!isDoNotShowAgain)} />
            <Label htmlFor="do-not-show-again" whiteSpace="nowrap">
              {t('Shop.sell-confirm-checkbox')}
            </Label>
          </Flex>
          <Flex gap="8px" justifyContent="flex-end" width="100%">
            <Button onClick={onClose} variant="secondary" size="m">
              {t('Common.close')}
            </Button>
            <Button onClick={confirmDialog} variant="primary" size="m" disabled={isLoading}>
              {isLoading ? t('Common.processing') : t('Common.confirm')}
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog>
  );
}

const descriptionStyle = css({
  textAlign: 'left',
  color: 'white.white_75',
  width: '100%',
});
