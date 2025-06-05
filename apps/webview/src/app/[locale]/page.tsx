import React from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getServerAuth } from '@/auth';

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
  return <div>hello world {session?.user?.name}</div>;
}
