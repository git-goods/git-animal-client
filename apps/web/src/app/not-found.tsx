'use client';

import { useEffect } from 'react';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { ErrorPage } from '@/components/Error/ErrorPage';
import { isDev } from '@/constants/env';
import { usePathname, useRouter } from '@/i18n/routing';

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
      paragraph="The page you are looking for does not exist."
      onClickButton={onClickButton}
      buttonText="Go to Home"
    />
  );
}
