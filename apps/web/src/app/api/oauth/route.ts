import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://api.gitanimals.org/logins/oauth/github', {
    headers: {
      'Redirect-When-Success': process.env.NODE_ENV === 'production' ? 'HOME' : 'LOCAL',
    },
  });

  return NextResponse.json({ url: res.url });
}

export const dynamic = 'force-dynamic';
