'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { ErrorPage } from '@/components/Error/ErrorPage';
import { isDev } from '@/constants/env';

interface Props {
  error: Error;
  reset: VoidFunction;
}

const GITHUB_ISSUE_URL = 'https://github.com/git-goods/gitanimals/issues';

const GlobalErrorPage = ({ error, reset }: Props) => {
  useEffect(() => {
    if (isDev) return;

    sendMessageToErrorChannel(`<!here>
🔥 Global Error 발생 🔥
Error Message: ${error.message}
\`\`\`
Error Stack: ${error.stack}
\`\`\`
`);
  }, [error]);

  const router = useRouter();

  const onClickRetry = () => {
    signOut();
    reset();
    router.push('/');
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
