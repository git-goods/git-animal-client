'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { ErrorPage } from '@/components/Error/ErrorPage';
import { isDev } from '@/constants/env';
import { GITHUB_ISSUE_URL } from '@/constants/outlink';
import { usePathname, useRouter } from '@/i18n/routing';

export default function NotFound() {
  const pathname = usePathname();
  const t = useTranslations('NotFound');

  useEffect(() => {
    if (isDev) return;

    sendMessageToErrorChannel(`<!here>
🌌 Not Found 🌌
Path: ${pathname}
`);
  }, [pathname]);

  const router = useRouter();

  const onClickButton = () => {
    router.push('/');
  };

  return (
    <ErrorPage
      heading={t('title')}
      paragraph={
        <div className="text-center">
          {t('main-description')}
          <br />
          <br />
          <div className="text-gray-500">
            {t('description-line-1')} [<a href={GITHUB_ISSUE_URL}>GitHub</a>]
            <br />
            {t('description-line-2')}
          </div>
        </div>
      }
      onClickButton={onClickButton}
      buttonText={t('home-button-text')}
    />
  );
}
