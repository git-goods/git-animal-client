import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { postGotcha } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { GITHUB_ISSUE_URL } from '@/constants/outlink';
import { trackEvent } from '@/lib/analytics';

import { type GachaFailureKind, getGachaErrorKind } from './gachaError';
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
  const [errorKind, setErrorKind] = useState<GachaFailureKind | null>(null);

  const onDraw = async () => {
    // 포인트 부족은 호출 전에 걸러지는 사용자 입력 문제 — 토스트로 알리고 창을 닫는다.
    if (!checkEnoughMoney()) {
      toast.error(t('not-enough-points'));
      onClose();
      return;
    }

    setErrorKind(null);

    try {
      const res = await postGotcha({ count: 1 });
      const resultPersona = res.gotchaResults[0];

      if (!resultPersona) {
        setErrorKind('unknown');
        trackEvent('gotcha', { type: '1-pet', status: 'error', reason: 'empty-result' });
        return;
      }

      queryClient.invalidateQueries({ queryKey: userQueries.userKey() });

      trackEvent('gotcha', {
        type: '1-pet',
        status: 'success',
      });

      // 성공 토스트/결과 오버레이는 GachaHatchGame의 연출이 담당한다.
      return { name: resultPersona.name, dropRate: resultPersona.dropRate };
    } catch (error) {
      const kind = getGachaErrorKind(error);

      trackEvent('gotcha', {
        type: '1-pet',
        status: 'error',
        reason: kind,
      });

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

        <GachaHatchGame onDraw={onDraw} errorKind={errorKind} onClose={onClose} onBusyChange={setBusy} />
      </Dialog.Content>
    </Dialog>
  );
}

export default OnePet;
