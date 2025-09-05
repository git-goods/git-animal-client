import React from 'react';
import { css } from '_panda/css';
import { postGotcha } from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import { userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CardDrawingGame } from '@/components/CardGame/FanDrawingGame/FanDrawingGame';
import { GITHUB_ISSUE_URL } from '@/constants/outlink';

import { useCheckEnoughMoney } from './useCheckEnoughMoney';
import { useTranslation } from 'react-i18next';
import { authUtils } from '@/utils';

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
      <Dialog.Content size="large" className={dialogContentStyle}>
        <Dialog.Title className={headingStyle}>{t('choose-one-card')}</Dialog.Title>

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

const dialogContentStyle = css({
  height: 'fit-content',

  _mobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',

  _mobile: {
    textStyle: 'glyph28.bold',
  },
});
