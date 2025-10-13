import { NextResponse } from 'next/server';

export async function GET() {
  const redirectWhenSuccess = (() => {
    const NEXT_PUBLIC_ENV_MODE = process.env.NEXT_PUBLIC_ENV_MODE;

    if (NEXT_PUBLIC_ENV_MODE === 'prod') {
      return 'HOME';
    }
    if (NEXT_PUBLIC_ENV_MODE === 'dev') {
      return 'DEV';
    }

    if (process.env.NODE_ENV === 'development') {
      return 'LOCAL';
    }

    return 'HOME';
  })();

  const res = await fetch('https://api.gitanimals.org/logins/oauth/github', {
    headers: {
      'Redirect-When-Success': redirectWhenSuccess,
    },
  });

  return NextResponse.json({ url: res.url });
}

export const dynamic = 'force-dynamic';
