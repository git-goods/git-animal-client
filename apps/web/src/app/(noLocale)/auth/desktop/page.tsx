import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { css } from '_panda/css';

import { getServerAuth } from '@/auth';
import { buildDesktopCallbackUrl, isValidDesktopRedirect } from '@/constants/desktopAuth';
import { COOKIE_KEY } from '@/constants/storage';
import { DEFAULT_LOCALE } from '@/i18n/routing';

export default async function DesktopAuthEntryPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_uri?: string; state?: string }>;
}) {
  const { redirect_uri, state } = await searchParams;

  if (!redirect_uri || !state || !isValidDesktopRedirect(redirect_uri)) {
    return (
      <main className={mainCss}>
        <h1 className={headingCss}>잘못된 요청</h1>
        <p className={descCss}>
          {!redirect_uri || !state
            ? '필수 파라미터(redirect_uri, state)가 누락되었습니다.'
            : 'redirect_uri가 허용 범위를 벗어났습니다. GitAnimals 데스크톱 앱을 통해 다시 시도해주세요.'}
        </p>
      </main>
    );
  }

  const session = await getServerAuth();
  if (session?.user?.accessToken) {
    redirect(buildDesktopCallbackUrl(redirect_uri, session.user.accessToken, state));
  }

  const locale = cookies().get(COOKIE_KEY.locale)?.value ?? DEFAULT_LOCALE;
  const params = new URLSearchParams({ redirect_uri, state }).toString();
  redirect(`/${locale}/auth/desktop?${params}`);
}

const mainCss = css({
  backgroundColor: 'white',
  w: '100dvw',
  h: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 16px',
});

const headingCss = css({
  textStyle: 'glyph40.bold',
  marginBottom: '12px',
});

const descCss = css({
  textStyle: 'glyph16.regular',
});
