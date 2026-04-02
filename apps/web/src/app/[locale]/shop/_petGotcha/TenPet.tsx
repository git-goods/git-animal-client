import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import type { GotchaResult } from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import { usePostGotcha, userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/shared/api/slack';
import { GITHUB_ISSUE_URL } from '@/shared/config/outlink';
import { useTimer } from '@/shared/hooks/useTimer';
import { trackEvent } from '@/shared/lib/analytics';

import { TenCardFlipGame } from './TenCardFlipGame';
import { useCheckEnoughMoney } from './useCheckEnoughMoney';

const TEN_PET_POINT = 10000 as const;

interface Props {
  onClose: () => void;
}

export function TenPet({ onClose }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations('Gotcha');

  const [getPersona, setGetPersona] = useState<GotchaResult[] | null>(null);

  const { count, isRunning, isFinished, startTimer, resetTimer } = useTimer(3);

  const { data } = useSession();
  const { checkEnoughMoney } = useCheckEnoughMoney({ enoughPoint: TEN_PET_POINT });

  const {
    mutate: postGotcha,
    isPending,
    isSuccess,
  } = usePostGotcha({
    onSuccess: async (res) => {
      const resultPersona = res.gotchaResults;
      setGetPersona(resultPersona);

      queryClient.invalidateQueries({ queryKey: userQueries.allKey() });
      startTimer();

      trackEvent('gotcha', {
        type: '10-pet',
        status: 'success',
      });
    },
    onError: (error) => {
      trackEvent('gotcha', {
        type: '10-pet',
        status: 'error',
      });

      toast.error(t('get-persona-fail'), {
        description:
          error instanceof CustomException && error.code === 'TOKEN_EXPIRED'
            ? t('token-expired')
            : t('many-error-message'),
        action: {
          label: t('contact-us'),
          onClick: () => {
            window.location.href = GITHUB_ISSUE_URL;
          },
        },
      });
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
    },
  });

  const onAction = async () => {
    if (isPending) return;

    try {
      if (!checkEnoughMoney()) {
        throw new Error(t('not-enough-points'));
      }

      postGotcha({ count: 10 });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
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
      <Dialog.Content size="screen" className={dialogContentStyle}>
        <Dialog.Title>
          {isPending ? t('gotcha-in-progress') : isSuccess ? t('get-persona-success') : t('click-card-to-flip')}
        </Dialog.Title>
        {isRunning && (
          <p className={noticeMessageStyle}>{t('close-notice-message').replace('[count]', count.toString())}</p>
        )}
        <div className={cn(gameContainerStyle, isPending && 'pointer-events-none')}>
          <TenCardFlipGame onGetPersona={onAction} getPersona={getPersona} />
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

const dialogContentStyle = cn('max-mobile:gap-3');

const noticeMessageStyle = cn(
  'font-product text-glyph-28 font-bold text-white text-center mt-3',
  'max-mobile:text-xs max-mobile:mt-0',
);

const gameContainerStyle = cn('w-full mt-[60px]', 'max-mobile:mt-7');
