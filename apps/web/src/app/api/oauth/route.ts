import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const headersList = headers();
    const platform = headersList.get('Platform') || 'WEB';

    const res = await fetch('https://api.gitanimals.org/logins/oauth/github', {
      headers: {
        Platform: platform,
        'Redirect-When-Success':
          platform === 'WEB' ? (process.env.NODE_ENV === 'production' ? 'HOME' : 'LOCAL') : 'APP',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error('OAuth URL 요청 실패:', error);
    return NextResponse.json({ error: '인증 URL을 가져오는데 실패했습니다' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
