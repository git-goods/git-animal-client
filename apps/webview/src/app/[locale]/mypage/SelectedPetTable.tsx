'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
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
    <div className={css({})}>
      {currentPersona && (
        <div
          className={css({
            bg: 'gray.gray_150',
            minH: '200px',
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            pb: '20px',
            pt: '8px',
          })}
        >
          <img src={getPersonaImage(currentPersona.type)} alt={currentPersona.type} width={100} height={100} />
          <div className={css({ display: 'flex', gap: '12px' })}>
            <div className={css({ textStyle: 'glyph15.regular', color: 'white.white' })}>
              {snakeToTitleCase(currentPersona.type)}
            </div>
            <div className={css({ textStyle: 'glyph14.regular', color: 'white.white_50' })}>
              <span>{ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(currentPersona.dropRate.replace('%', '')))]}</span>
              <span>{currentPersona.level}</span>
            </div>
          </div>
          <div className={flex({ gap: '8px', mt: 3 })}>
            <Button variant="secondary" onClick={onSellClick}>
              {t('sell')} (100P)
            </Button>
            <Button variant="secondary" onClick={() => setIsMergeOpen(true)}>
              {t('merge')}
            </Button>
          </div>
        </div>
      )}

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
