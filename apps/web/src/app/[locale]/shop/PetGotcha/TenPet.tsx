import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { center } from '_panda/patterns';
import type { GotchaResult } from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import { usePostGotcha } from '@gitanimals/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { USER_QUERY_KEY } from '@/apis/user/useGetUser';
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

      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
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
        Error Message: ${error}
        ${JSON.stringify(error, null, 2)}
        User: ${data?.user.name}
        Token: ${data?.user.accessToken}
        User All: ${JSON.stringify(data?.user, null, 2)}
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
    <article className={modalStyle}>
      <div className={modalContentStyle}>
        <button className={closeButtonStyle} onClick={onClose}>
          <X size={40} color="white" />
        </button>
        <h2 className={headingStyle}>
          {isPending ? t('gotcha-in-progress') : isSuccess ? t('get-persona-success') : t('choose-one-card')}
        </h2>
        {isRunning && (
          <p className={noticeMessageStyle}>{t('close-notice-message').replace('[count]', count.toString())}</p>
        )}
        <div className={css({ width: '100%', mt: 60 })}>
          <TenCardFlipGame onClose={onClose} onGetPersona={onAction} getPersona={getPersona} />
        </div>
      </div>
    </article>
  );
}

const noticeMessageStyle = css({
  textStyle: 'glyph28.bold',
  color: 'white',
  textAlign: 'center',
  mt: 12,
});

const modalStyle = center({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'black.black_75',
  zIndex: 1000,
});

const modalContentStyle = center({
  backgroundColor: 'gray.gray_150',
  flexDirection: 'column',
  width: 'calc(100% - 400px)',
  minWidth: '1260px',
  maxWidth: '1540px',
  height: 'calc(100% - 120px)',
  maxHeight: '840px',
  borderRadius: '20px',
  position: 'relative',
});

const closeButtonStyle = css({
  position: 'absolute',
  right: '28px',
  top: '28px',
});

const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',
});
