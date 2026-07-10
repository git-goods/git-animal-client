import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import type { GotchaResult } from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import { usePostGotcha, userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { GITHUB_ISSUE_URL } from '@/constants/outlink';
import { trackEvent } from '@/lib/analytics';

import { CardPackGame } from './CardPackGame';
import { useCheckEnoughMoney } from './useCheckEnoughMoney';

const TEN_PET_POINT = 10000 as const;

interface Props {
  onClose: () => void;
}

export function TenPet({ onClose }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations('Gotcha');

  const [getPersona, setGetPersona] = useState<GotchaResult[] | null>(null);
  // 개봉~공개 완료 전엔 닫기 차단 (포인트 차감 후 결과 미확인 방지)
  const [busy, setBusy] = useState(false);

  const { data } = useSession();
  const { checkEnoughMoney } = useCheckEnoughMoney({ enoughPoint: TEN_PET_POINT });

  const { mutate: postGotcha } = usePostGotcha({
    onSuccess: (res) => {
      setGetPersona(res.gotchaResults);
      queryClient.invalidateQueries({ queryKey: userQueries.allKey() });
      trackEvent('gotcha', { type: '10-pet', status: 'success' });
    },
    onError: (error) => {
      trackEvent('gotcha', { type: '10-pet', status: 'error' });

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

  // 카드팩 개봉 = API 호출
  const onOpen = () => {
    try {
      if (!checkEnoughMoney()) {
        throw new Error(t('not-enough-points'));
      }
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
        <CardPackGame onOpen={onOpen} results={getPersona} onClose={onClose} onBusyChange={setBusy} />
      </Dialog.Content>
    </Dialog>
  );
}
