'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { sendMessageToErrorChannel } from '@/shared/api/slack';
import { ErrorPage } from '@/shared/ui/Error';
import { isDev } from '@/shared/config/env';
import { GITHUB_ISSUE_URL } from '@/shared/config/outlink';

export default function NotFound() {
  const pathname = usePathname();

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
      heading="Not Found 🤔"
      paragraph={
        <div className="text-center">
          The page you are looking for does not exist.
          <br />
          <br />
          <div className="text-gray-500">
            If you have anything to report about the problem, please add it to the link here. [
            <a href={GITHUB_ISSUE_URL}>Github</a>]
            <br />
            It's a great help to fix the bug
          </div>
        </div>
      }
      onClickButton={onClickButton}
      buttonText="Go to Home"
    />
  );
}
