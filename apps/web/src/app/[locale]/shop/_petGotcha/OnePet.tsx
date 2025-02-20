import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { postGotcha } from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import { userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import type { AnimalTierType } from '@/components/AnimalCard/AnimalCard.constant';
import { GITHUB_ISSUE_URL } from '@/constants/outlink';
import { useTimer } from '@/hooks/useTimer';
import { trackEvent } from '@/lib/analytics';
import { getAnimalTierInfo } from '@/utils/animals';

import CardFlipGame from './CardFlipGame';
import { useCheckEnoughMoney } from './useCheckEnoughMoney';

const ONE_PET_POINT = 1000 as const;
interface Props {
  onClose: () => void;
}

function OnePet({ onClose }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations('Gotcha');

  const [getPersona, setGetPersona] = useState<{
    type: string;
    dropRate: string;
    tier: AnimalTierType;
  } | null>(null);

  const { count, isRunning, isFinished, startTimer, resetTimer } = useTimer(3);

  const { data } = useSession();
  const { checkEnoughMoney } = useCheckEnoughMoney({ enoughPoint: ONE_PET_POINT });

  const onAction = async () => {
    try {
      if (!checkEnoughMoney()) {
        throw new Error(t('not-enough-points'));
      }

      const res = await postGotcha({ count: 1 });

      const resultPersona = res.gotchaResults[0];
      const tier = getAnimalTierInfo(Number(resultPersona.dropRate.replace('%', '')));

      const persona = {
        type: resultPersona.name,
        dropRate: resultPersona.dropRate,
        tier: tier,
      };
      setGetPersona(persona);
      startTimer();

      queryClient.invalidateQueries({ queryKey: userQueries.userKey() });
      toast.success(t('get-persona-success'));

      trackEvent('gotcha', {
        type: '1-pet',
        status: 'success',
      });
    } catch (error) {
      trackEvent('gotcha', {
        type: '1-pet',
        status: 'error',
      });

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
        signOut();
        return;
      }

      sendMessageToErrorChannel(`<!here>
🔥 펫 뽑기 실패 🔥
\`\`\`
Error Message: ${JSON.stringify(error)}
\`\`\`
User: ${data?.user.name}
Token: ${data?.user.accessToken} 
      `);
    }
  };

  useEffect(() => {
    // 3초 후에 닫기
    if (isFinished) {
      onClose();
      resetTimer();
    }
  }, [isFinished, onClose, resetTimer]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <Dialog.Content size="screen">
        <Dialog.Title className={headingStyle}>{t('choose-one-card')}</Dialog.Title>
        <CardFlipGame onClose={onClose} onGetPersona={onAction} getPersona={getPersona} />
        {isRunning && (
          <p className={noticeMessageStyle}>{t('close-notice-message').replace('[count]', count.toString())}</p>
        )}
      </Dialog.Content>
    </Dialog>
  );
}

export default OnePet;

const noticeMessageStyle = css({
  position: 'absolute',
  bottom: '100px',
  textStyle: 'glyph28.bold',
  color: 'white',
  textAlign: 'center',
});

const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',
  marginBottom: '60px',

  _mobile: {
    textStyle: 'glyph28.bold',
    marginBottom: '40px',
  },
});
