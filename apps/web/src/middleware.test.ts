import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import middleware from './middleware';

const visitRoot = (headers: Record<string, string>) =>
  middleware(new NextRequest('https://www.gitanimals.org/', { headers }));

describe('위치 기반 첫 진입 언어', () => {
  it('한국에서 접속하면 영어 브라우저여도 ko-KR', async () => {
    const res = await visitRoot({ 'x-vercel-ip-country': 'KR', 'accept-language': 'en-US' });
    expect(res.headers.get('location')).toContain('/ko-KR');
  });

  it('한국 밖은 브라우저 언어를 따른다', async () => {
    const res = await visitRoot({ 'x-vercel-ip-country': 'US', 'accept-language': 'en-US' });
    expect(res.headers.get('location')).toContain('/en-US');
  });

  it('직접 고른 언어 쿠키가 위치보다 우선', async () => {
    const res = await visitRoot({ 'x-vercel-ip-country': 'KR', cookie: 'NEXT_LOCALE=en-US' });
    expect(res.headers.get('location')).toContain('/en-US');
  });
});
