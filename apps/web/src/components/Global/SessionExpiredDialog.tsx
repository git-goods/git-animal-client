'use client';

import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button, Dialog } from '@gitanimals/ui-panda';
import { useAtomValue } from 'jotai';

import { login } from '@/components/AuthButton';
import { sessionExpiredAtom } from '@/utils/sessionExpired';

export function SessionExpiredDialog() {
  const { open, callbackUrl } = useAtomValue(sessionExpiredAtom);
  const t = useTranslations('Auth');

  const handleLogin = () => {
    login(callbackUrl ?? '/mypage');
  };

  return (
    <Dialog open={open}>
      <Dialog.Content
        isShowClose={false}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Dialog.Title className={titleStyle}>{t('sessionExpiredTitle')}</Dialog.Title>
        <Dialog.Description className={descriptionStyle}>{t('sessionExpiredDescription')}</Dialog.Description>
        <Flex gap="8px" justifyContent="flex-end" width="100%">
          <Button onClick={handleLogin} variant="primary" size="m">
            {t('sessionExpiredAction')}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog>
  );
}

const titleStyle = css({
  textStyle: 'glyph20.regular',
  textAlign: 'left',
});

const descriptionStyle = css({
  textStyle: 'glyph16.regular',
  textAlign: 'left',
  color: 'white.white_75',
  width: '100%',
});
