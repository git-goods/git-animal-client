import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import type { GotchaResult } from '@gitanimals/api';
import { usePostGotcha, userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { GITHUB_ISSUE_URL } from '@/constants/outlink';
import { trackEvent } from '@/lib/analytics';

import { CardPackGame } from './CardPackGame';
import { type GachaFailureKind, getGachaErrorKind } from './gachaError';
import { useCheckEnoughMoney } from './useCheckEnoughMoney';

const TEN_PET_POINT = 10000 as const;

interface Props {
  onClose: () => void;
}

export function TenPet({ onClose }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations('Gotcha');

  const [getPersona, setGetPersona] = useState<GotchaResult[] | null>(null);
  const [errorKind, setErrorKind] = useState<GachaFailureKind | null>(null);
  // 개봉~공개 완료 전엔 닫기 차단 (포인트 차감 후 결과 미확인 방지)
  const [busy, setBusy] = useState(false);

  const { data } = useSession();
  const { checkEnoughMoney } = useCheckEnoughMoney({ enoughPoint: TEN_PET_POINT });

  const { mutate: postGotcha } = usePostGotcha({
    onSuccess: (res) => {
      // 결과가 비어 있으면 연출할 것이 없다 — 실패로 취급해 안내를 띄운다.
      if (res.gotchaResults.length === 0) {
        setErrorKind('unknown');
        trackEvent('gotcha', { type: '10-pet', status: 'error' });
        return;
      }
      setGetPersona(res.gotchaResults);
      queryClient.invalidateQueries({ queryKey: userQueries.allKey() });
      trackEvent('gotcha', { type: '10-pet', status: 'success' });
    },
    onError: (error) => {
      const kind = getGachaErrorKind(error);
      trackEvent('gotcha', { type: '10-pet', status: 'error', reason: kind });

      // 토큰 만료는 재로그인으로 넘겨야 해서 창을 닫는다.
      if (kind === 'token-expired') {
        toast.error(t('get-persona-fail'), {
          description: t('token-expired'),
          action: {
            label: t('contact-us'),
            onClick: () => {
              window.location.href = GITHUB_ISSUE_URL;
            },
          },
        });
        onClose();
        signOut();
        return;
      }

      // 그 외에는 창을 유지하고 원인과 재시도를 화면에 남긴다.
      setErrorKind(kind);
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

  // 카드팩 개봉 = API 호출
  const onOpen = () => {
    try {
      if (!checkEnoughMoney()) {
        throw new Error(t('not-enough-points'));
      }
      setErrorKind(null);
      postGotcha({ count: 10 });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      onClose();
    }
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open && !busy) onClose();
      }}
    >
      <Dialog.Content size="screen" isShowClose={!busy} className="border-none bg-black-90 p-0">
        <Dialog.Title className="sr-only">{t('pet-gotcha-title')}</Dialog.Title>
        <CardPackGame
          onOpen={onOpen}
          results={getPersona}
          errorKind={errorKind}
          onClose={onClose}
          onBusyChange={setBusy}
        />
      </Dialog.Content>
    </Dialog>
  );
}
