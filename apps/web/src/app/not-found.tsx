'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { ErrorPage } from '@/components/Error/ErrorPage';
import { isDev } from '@/constants/env';
import { useClientUser } from '@/utils/clientAuth';

export default function NotFound() {
  const pathname = usePathname();
  const user = useClientUser();

  useEffect(() => {
    if (isDev) return;

    sendMessageToErrorChannel(`<!here>
🌌 Not Found 🌌
Path: ${pathname}
User: ${user ? JSON.stringify(user) : 'NOT LOGGED IN'}
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
