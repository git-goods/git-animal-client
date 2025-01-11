'use client';

import { useEffect } from 'react';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { ErrorPage } from '@/components/Error/ErrorPage';
import { isDev } from '@/constants/env';
import { useRouter } from '@/i18n/routing';

interface Props {
  error: Error;
  reset: VoidFunction;
}

const GITHUB_ISSUE_URL = 'https://github.com/git-goods/gitanimals/issues';

const NOT_AUTHORIZED_MESSAGE = 'Request failed with status code 401';
const KNOWN_ERROR_MESSAGES = [NOT_AUTHORIZED_MESSAGE];

const GlobalErrorPage = ({ error, reset }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (isDev) return;
    if (KNOWN_ERROR_MESSAGES.includes(error.message)) return;

    sendMessageToErrorChannel(`<!here>
🔥 Global Error 발생 🔥
Error Message: ${error.message}
\`\`\`
Error Stack: ${error.stack}
\`\`\`
`);
  }, [error]);

  const onClickRetry = async () => {
    try {
      reset();
      router.refresh();
      router.push(window.location.pathname);
    } catch (e) {
      console.error('Error during reset:', e);
    }
  };

  return (
    <html lang="en">
      <body>
        <ErrorPage
          heading="Something went wrong 😭"
          paragraph={
            <>
              If you want to report this error, please create an issue in <a href={GITHUB_ISSUE_URL}>Github</a>.
            </>
          }
          onClickButton={onClickRetry}
        />
      </body>
    </html>
  );
};

export default GlobalErrorPage;
