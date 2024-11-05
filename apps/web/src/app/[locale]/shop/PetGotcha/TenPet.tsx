import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import type { GotchaResult } from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import { usePostGotcha, userQueries } from '@gitanimals/react-query';
import { ScreenModalBase } from '@gitanimals/ui-panda/src/components/Modal';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { useTimer } from '@/hooks/useTimer';

import { TenCardFlipGame } from './TenCardFlipGame';

const GITHUB_ISSUE_URL = 'https://github.com/git-goods/gitanimals/issues';

interface Props {
  onClose: () => void;
}

export function TenPet({ onClose }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations('Gotcha');

  const [getPersona, setGetPersona] = useState<GotchaResult[] | null>(null);

  const { count, isRunning, isFinished, startTimer, resetTimer } = useTimer(3);

  const { data } = useSession();
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
    },
    onError: (error) => {
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
Error Message: ${(error as Error).message}
\`\`\`
Error Stack: ${(error as Error).stack}
\`\`\`

User: ${data?.user.name}
Token: ${data?.user.accessToken} 
      `);
    },
  });

  const onAction = async () => {
    postGotcha({ count: 10 });
  };

  useEffect(() => {
    // 3초 후에 닫기
    if (isFinished) {
      onClose();
      resetTimer();
    }
  }, [isFinished, onClose, resetTimer]);

  return (
    <ScreenModalBase isOpen={true} onClose={onClose}>
      <h2 className={headingStyle}>
        {isPending ? t('gotcha-in-progress') : isSuccess ? t('get-persona-success') : t('click-card-to-flip')}
      </h2>
      {isRunning && (
        <p className={noticeMessageStyle}>{t('close-notice-message').replace('[count]', count.toString())}</p>
      )}
      <div className={css({ width: '100%', mt: 60 })}>
        <TenCardFlipGame onGetPersona={onAction} getPersona={getPersona} />
      </div>
    </ScreenModalBase>
  );
}

const noticeMessageStyle = css({
  textStyle: 'glyph28.bold',
  color: 'white',
  textAlign: 'center',
  mt: 12,
});

const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',
});
