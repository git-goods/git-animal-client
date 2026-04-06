import React from 'react';
import { postGotcha } from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import { userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import { CardDrawingGame } from '@/components/CardGame/FanDrawingGame/FanDrawingGame';
import { GITHUB_ISSUE_URL } from '@/constants/outlink';
import { authUtils } from '@/utils';

import { useCheckEnoughMoney } from './useCheckEnoughMoney';

const ONE_PET_POINT = 1000 as const;

interface Props {
  onClose: () => void;
}

function OnePet({ onClose }: Props) {
  const queryClient = useQueryClient();
  const { t } = useTranslation('gotcha');

  const { checkEnoughMoney } = useCheckEnoughMoney({ enoughPoint: ONE_PET_POINT });

  const onAction = async () => {
    try {
      if (!checkEnoughMoney()) {
        throw new Error(t('not-enough-points'));
      }

      const res = await postGotcha({ count: 1 });
      const resultPersona = res.gotchaResults[0];

      queryClient.invalidateQueries({ queryKey: userQueries.userKey() });
      toast.success(t('get-persona-success'));

      // trackEvent('gotcha', {
      //   type: '1-pet',
      //   status: 'success',
      // });

      return { type: resultPersona.name, dropRate: resultPersona.dropRate };
    } catch (error) {
      // trackEvent('gotcha', {
      //   type: '1-pet',
      //   status: 'error',
      // });

      if (error instanceof CustomException) {
        toast.error(t('get-persona-fail'), {
          description: error.code === 'TOKEN_EXPIRED' ? t('token-expired') : t('many-error-message'),
          action: {
            label: t('contact-us'),
            onClick: () => {
              window.location.href = GITHUB_ISSUE_URL;
            },
          },
        });
      }

      if (error instanceof Error) {
        toast.error(error.message);
      }

      onClose();

      if (error instanceof CustomException && error.code === 'TOKEN_EXPIRED') {
        authUtils.logout();
        return;
      }
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <Dialog.Content
        size="large"
        className="h-fit max-mobile:flex max-mobile:flex-col max-mobile:items-center max-mobile:justify-center"
      >
        <Dialog.Title className="text-center font-product text-glyph-48 font-bold text-white max-mobile:text-glyph-28">
          {t('choose-one-card')}
        </Dialog.Title>

        <CardDrawingGame
          characters={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }]}
          onSelectCard={onAction}
          onClose={onClose}
        />
      </Dialog.Content>
    </Dialog>
  );
}

export default OnePet;
