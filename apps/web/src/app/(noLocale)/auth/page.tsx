import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import notFound from '@/app/[locale]/not-found';
import { COOKIE_KEY } from '@/constants/storage';

export default async function AuthPage({ searchParams }: { searchParams: Promise<{ jwt: string }> }) {
  const jwtToken = (await searchParams).jwt;
  const locale = cookies().get(COOKIE_KEY.locale)?.value;

  if (!locale || !jwtToken) {
    notFound();
  }

  redirect(`/${locale}/auth?jwt=${jwtToken}`);
}
