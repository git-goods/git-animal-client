import React from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Button } from '@gitanimals/ui-panda';

import { getServerAuth } from '@/auth';
import { LoginButton } from '@/components/AuthButton';
import { Link } from '@/i18n/routing';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page');

  return {
    title: t('main'),
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerAuth();
  return (
    <div>
      {!session ? (
        <LoginButton label="Login" />
      ) : (
        <Link href="/mypage">
          <Button className="desktop" size="l">
            Go To Mypage
          </Button>
          <Button className="mobile" size="m">
            Go To Mypage
          </Button>
        </Link>
      )}
    </div>
  );
}
