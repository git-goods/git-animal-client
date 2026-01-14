'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { dropPet, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, Checkbox, cn, Dialog, Label } from '@gitanimals/ui-tailwind';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { toast } from 'sonner';

import { LOCAL_STORAGE_KEY } from '@/constants/storage';
import { ANIMAL_TIER_TEXT_MAP, getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

import { EvolutionPersona } from './(evolution)';
import { MergePersona } from './(merge)';

interface SelectedPetTableProps {
  currentPersona: Persona | null;
  reset: () => void;
}

export function SelectedPetTable({ currentPersona, reset }: SelectedPetTableProps) {
  const queryClient = useQueryClient();

  const t = useTranslations('Shop');
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

  const isEvolutionAble = currentPersona?.isEvolutionable;
  console.debug('c', currentPersona);

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

  const onMergeClick = () => {
    if (!currentPersona) return;
    // setIsMergeOpen(true);
    overlay.open(({ isOpen, close }) => (
      <MergePersona key={currentPersona.id} isOpen={isOpen} onClose={() => close()} targetPersona={currentPersona} />
    ));
  };

  const onEvolutionClick = () => {
    if (!currentPersona) return;
    // setIsEvolutionOpen(true);
    overlay.open(({ isOpen, close }) => (
      <EvolutionPersona
        key={currentPersona.id}
        isOpen={isOpen}
        onClose={() => close()}
        targetPersona={currentPersona}
      />
    ));
  };

  return (
    <div className="w-full mb-8">
      <div className="grid grid-cols-[1fr_2.5fr_1fr_1fr_5.7fr] gap-4 py-1 px-8 rounded-xl bg-white/50 items-center h-[46px] font-product-bold text-glyph-18 text-white mb-1 [&>span:first-child]:text-center max-mobile:text-base">
        <span>{t('pet')}</span>
        <span>{t('name')}</span>
        <span>{t('grade')}</span>
        <span>{t('level')}</span>
        <span></span>
      </div>

      <div className="w-full h-20 bg-white/10 rounded-xl grid grid-cols-[1fr_2.5fr_1fr_1fr_5.7fr] items-center py-0 px-8 gap-4 font-product text-glyph-20 text-white [&_button]:text-black [&_button]:w-full [&_button]:px-1.5 [&_*]:overflow-hidden [&_*]:text-ellipsis max-mobile:text-base">
        {currentPersona && (
          <>
            <div>
              <Image src={getPersonaImage(currentPersona.type)} alt={currentPersona.type} width={60} height={67} />
            </div>
            <div>{snakeToTitleCase(currentPersona.type)}</div>
            <div>{ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(currentPersona.dropRate.replace('%', '')))]}</div>
            <div>{currentPersona.level}</div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={onSellClick}>
                {t('sell')} (100P)
              </Button>
              <Button variant="secondary" onClick={onMergeClick}>
                {t('merge')}
              </Button>
              {isEvolutionAble && (
                <Button variant="secondary" onClick={onEvolutionClick}>
                  {t('evolution')}
                </Button>
              )}
            </div>
          </>
        )}
      </div>

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
        <Dialog.Description className="text-left text-white/75 w-full">
          <p>{t('Shop.sell-confirm-description')}</p>
        </Dialog.Description>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Checkbox id="do-not-show-again" onClick={() => setIsDoNotShowAgain(!isDoNotShowAgain)} />
            <Label htmlFor="do-not-show-again" className="whitespace-nowrap">
              {t('Shop.sell-confirm-checkbox')}
            </Label>
          </div>
          <div className="flex gap-2 justify-end w-full">
            <Button onClick={onClose} variant="secondary" size="m">
              {t('Common.close')}
            </Button>
            <Button onClick={confirmDialog} variant="primary" size="m" disabled={isLoading}>
              {isLoading ? t('Common.processing') : t('Common.confirm')}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
