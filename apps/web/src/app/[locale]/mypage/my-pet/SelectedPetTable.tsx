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
import { useClientUser } from '@/hooks/clientAuth';
import { trackEvent } from '@/lib/analytics';
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
  const { id: myId } = useClientUser();
  const [sellPersonaId, setSellPersonaId] = useState<string | null>(null);
  const { setDoNotShowAgain, isChecked: isDoNotShowAgain } = useDoNotShowAgain();

  const { mutate: dropPetMutation } = useMutation({
    mutationFn: (personaId: string) => dropPet({ personaId }),
    onSuccess: (data) => {
      toast.success((t('pet-sold') as string).replace('[money]', data.givenPoint.toString()));
      queryClient.invalidateQueries({ queryKey: userQueries.allKey() });

      if (currentPersona) {
        trackEvent('click_pet_sell', {
          pet_name: currentPersona.type,
          pet_price: 100,
          pet_grade: ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(currentPersona.dropRate.replace('%', '')))],
          pet_level: Number(currentPersona.level),
          page_name: 'mypage',
          location: 'my_pet',
          seller_id: String(myId),
        });
      }

      setSellPersonaId(null);
      reset();
    },
    onError: () => {
      toast.error(t('sell-product-fail'));
    },
  });

  const isEvolutionAble = currentPersona?.isEvolutionable;

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
    <div className={tableCss}>
      <div className={theadCss}>
        <span>{t('pet')}</span>
        <span>{t('name')}</span>
        <span>{t('grade')}</span>
        <span>{t('level')}</span>
        <span></span>
      </div>

      <div className={cn(rowStyle, 'row')}>
        {currentPersona && (
          <>
            <div>
              <Image src={getPersonaImage(currentPersona.type)} alt={currentPersona.type} width={60} height={67} />
            </div>
            <div>{snakeToTitleCase(currentPersona.type)}</div>
            <div>{ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(currentPersona.dropRate.replace('%', '')))]}</div>
            <div>{currentPersona.level}</div>
            <div className="flex gap-[8px]">
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

const tableCss = 'w-full mb-[32px]';

const theadCss = cn(
  'grid grid-cols-[1fr_2.5fr_1fr_1fr_5.7fr] items-center gap-[16px] px-[32px] py-[4px]',
  'h-[46px] rounded-[12px] bg-white-50 glyph18-bold text-white-100',
  '[&>span:nth-child(1)]:text-center mb-[4px] mobile:text-[16px]',
);

const rowStyle = cn(
  'grid grid-cols-[1fr_2.5fr_1fr_1fr_5.7fr] items-center gap-[16px] px-[32px] py-0',
  'h-[80px] w-full rounded-[12px] bg-white-10 glyph20-regular text-white-100',
  '[&_button]:w-full [&_button]:px-[6px] [&_button]:text-black',
  '[&_*]:overflow-hidden [&_*]:text-ellipsis mobile:text-[16px]',
);

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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content size="screen">
        <Dialog.Title>{t('Shop.sell-confirm')}</Dialog.Title>
        <Dialog.Description>
          <p>{t('Shop.sell-confirm-description')}</p>
        </Dialog.Description>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="do-not-show-again" onClick={() => setIsDoNotShowAgain(!isDoNotShowAgain)} />
            <Label htmlFor="do-not-show-again" className="whitespace-nowrap">
              {t('Shop.sell-confirm-checkbox')}
            </Label>
          </div>
          <div className="flex w-full justify-end gap-[8px]">
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
