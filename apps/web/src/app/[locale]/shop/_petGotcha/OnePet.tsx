import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { postGotcha } from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import { userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { GITHUB_ISSUE_URL } from '@/constants/outlink';
import { trackEvent } from '@/lib/analytics';

import { GachaHatchGame } from './GachaHatchGame';
import { useCheckEnoughMoney } from './useCheckEnoughMoney';

const ONE_PET_POINT = 1000 as const;

interface Props {
  onClose: () => void;
}

function OnePet({ onClose }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations('Gotcha');

  const { data } = useSession();
  const { checkEnoughMoney } = useCheckEnoughMoney({ enoughPoint: ONE_PET_POINT });

  // 뽑는 중(포인트 차감~결과 전)엔 닫기 차단 — 실수로 닫아 결과를 못 보는 것 방지
  const [busy, setBusy] = useState(false);

  const onDraw = async () => {
    try {
      if (!checkEnoughMoney()) {
        throw new Error(t('not-enough-points'));
      }

      const res = await postGotcha({ count: 1 });
      const resultPersona = res.gotchaResults[0];

      queryClient.invalidateQueries({ queryKey: userQueries.userKey() });

      trackEvent('gotcha', {
        type: '1-pet',
        status: 'success',
      });

      // 성공 토스트/결과 오버레이는 GachaHatchGame의 연출이 담당한다.
      return { name: resultPersona.name, dropRate: resultPersona.dropRate };
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

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        // 뽑는 중엔 Esc/오버레이/X 로 닫히지 않도록 차단
        if (!open && !busy) onClose();
      }}
    >
      {/* 가챠 연출은 풀스크린 몰입형 — 박스 모달 대신 screen 변형 사용 */}
      <Dialog.Content size="screen" isShowClose={!busy} className="border-none bg-black-90 p-0">
        {/* 타이틀은 GOTCHA 워드마크가 대신 — a11y용으로만 유지 */}
        <Dialog.Title className="sr-only">{t('pet-gotcha-title')}</Dialog.Title>

        <GachaHatchGame onDraw={onDraw} onClose={onClose} onBusyChange={setBusy} />
      </Dialog.Content>
    </Dialog>
  );
}

export default OnePet;
