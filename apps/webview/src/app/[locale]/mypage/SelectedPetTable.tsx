'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Flex, Grid } from '_panda/jsx';
import { flex } from '_panda/patterns';
import { dropPet, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, Dialog } from '@gitanimals/ui-panda';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
    setSellPersonaId(currentPersona.id);
  };

  const onSellAction = async () => {
    if (!sellPersonaId) return;
    dropPetMutation(sellPersonaId);
  };

  return (
    <div className={css({ minH: '200px', bg: 'gray.gray_150', borderRadius: '10px' })}>
      {currentPersona && (
        <div
          className={css({
            minH: '200px',
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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

  const confirmDialog = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await onConfirm(false);
    setIsLoading(false);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className={css({ animation: 'none' })}>
        <Dialog.Title>{t('Shop.sell-confirm')}</Dialog.Title>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Grid gap="8px" gridTemplateColumns="1fr 1fr" width="100%">
            <Button onClick={onClose} variant="secondary" size="m">
              {t('Common.close')}
            </Button>
            <Button onClick={confirmDialog} variant="primary" size="m" disabled={isLoading}>
              {isLoading ? t('Common.processing') : t('Common.confirm')}
            </Button>
          </Grid>
        </Flex>
      </Dialog.Content>
    </Dialog>
  );
}
