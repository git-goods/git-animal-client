import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import type { GotchaResult } from '@gitanimals/api';
import { postGotcha } from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import { userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { SelectedCardMotion } from '@/components/CardGame/FanDrawingGame/CardMotion';
import { CardDrawingGame, DetailedCard } from '@/components/CardGame/FanDrawingGame/FanDrawingGame';
import { GITHUB_ISSUE_URL } from '@/constants/outlink';
import { trackEvent } from '@/lib/analytics';

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

  const onAction = async () => {
    try {
      if (!checkEnoughMoney()) {
        throw new Error(t('not-enough-points'));
      }

      const res = await postGotcha({ count: 1 });
      const resultPersona = res.gotchaResults[0];

      queryClient.invalidateQueries({ queryKey: userQueries.userKey() });
      toast.success(t('get-persona-success'));
      onClose();

      handleShowResult(resultPersona);

      trackEvent('gotcha', {
        type: '1-pet',
        status: 'success',
      });

      return { type: resultPersona.name, dropRate: resultPersona.dropRate };
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

  const handleShowResult = (resultPersona: GotchaResult) => {
    overlay.open(
      ({ isOpen, close }) =>
        isOpen && (
          <div
            className={overlayStyle}
            onClick={() => {
              close();
            }}
          >
            <SelectedCardMotion x={0} y={0} rotate={0} index={0}>
              <DetailedCard cardData={{ type: resultPersona.name, dropRate: resultPersona.dropRate }} />
            </SelectedCardMotion>
            <p className={noticeMessageStyle}>{t('click-to-close')}</p>
          </div>
        ),
    );
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

const overlayStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bg: 'black.black_50',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(10px)',
  flexDirection: 'column',
  gap: '100px',
  zIndex: 9001,
  cursor: 'pointer',
});

const noticeMessageStyle = css({
  textStyle: 'glyph22.regular',
  color: 'white',
  textAlign: 'center',
  _mobile: {
    textStyle: 'glyph16.regular',
  },
});
