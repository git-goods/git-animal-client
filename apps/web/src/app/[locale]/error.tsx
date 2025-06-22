'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { ErrorPage } from '@/components/Error/ErrorPage';
import { isDev } from '@/constants/env';
import { usePathname, useRouter } from '@/i18n/routing';
import { useClientUser } from '@/utils/clientAuth';

interface Props {
  error: Error;
  reset: VoidFunction;
}

const GITHUB_ISSUE_URL = 'https://github.com/git-goods/gitanimals/issues';

const NOT_AUTHORIZED_MESSAGE = 'Request failed with status code 401';
const KNOWN_ERROR_MESSAGES = [NOT_AUTHORIZED_MESSAGE];

const GlobalErrorPage = ({ error, reset }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useClientUser();

  const t = useTranslations('Error');

  useEffect(() => {
    if (isDev) return;
    if (KNOWN_ERROR_MESSAGES.includes(error.message)) return;

    sendMessageToErrorChannel(`<!here>
🔥 Global Error 발생 🔥
Something went wrong 😭
Error Message: ${error.message}
\`\`\`
Error Stack: ${error.stack}
\`\`\`

Pathname: ${pathname}
User: ${user?.id ? JSON.stringify(user) : 'NOT LOGGED IN'}
`);
  }, [error]);

  const onClickRetry = async () => {
    try {
      reset();
      router.refresh();
      router.push(pathname);
    } catch (e) {
      console.error('Error during reset:', e);
    }
  };

  return (
    <ErrorPage
      heading={t('global-error-message')}
      paragraph={<p className={css({ whiteSpace: 'pre-wrap', textAlign: 'center' })}>{t('want-to-report-error')}</p>}
      onClickButton={onClickRetry}
      secondButtonElement={
        <div className={css({ display: 'flex', justifyContent: 'center', gap: '16px' })}>
          <Button variant="secondary" onClick={() => router.push('/')}>
            Go to Home
          </Button>
          <Button variant="secondary" onClick={() => window.open(GITHUB_ISSUE_URL, '_blank')}>
            {t('report-error-button')}
          </Button>
        </div>
      }
    />
  );
};

export default GlobalErrorPage;
