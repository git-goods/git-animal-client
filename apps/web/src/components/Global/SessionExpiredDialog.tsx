'use client';

import { useTranslations } from 'next-intl';
import { Button, Dialog } from '@gitanimals/ui-tailwind';
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
        <Dialog.Title className="text-left glyph20-regular">{t('sessionExpiredTitle')}</Dialog.Title>
        <Dialog.Description className="w-full text-left glyph16-regular text-white-75">
          {t('sessionExpiredDescription')}
        </Dialog.Description>
        <div className="flex w-full justify-end gap-[8px]">
          <Button onClick={handleLogin} variant="primary" size="m">
            {t('sessionExpiredAction')}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
