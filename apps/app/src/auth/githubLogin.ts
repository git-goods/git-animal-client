import * as WebBrowser from 'expo-web-browser';

// 백엔드 RedirectWhenSuccess.APP: 로그인 성공 시 gitanimals://auth?jwt=... 로 보낸다
export const GITHUB_LOGIN_URL = 'https://api.gitanimals.org/logins/oauth/github/by-redirect-when-success/APP';
export const APP_REDIRECT = 'gitanimals://auth';

// RN 의 URL 은 searchParams 를 지원하지 않아 정규식으로 자른다
const CALLBACK = /^gitanimals:\/\/auth\/?\?([^#]*)/;

export function extractJwt(url: string): string | null {
  const query = CALLBACK.exec(url)?.[1];
  if (!query) return null;
  for (const pair of query.split('&')) {
    const eq = pair.indexOf('=');
    if (eq < 0) continue;
    const key = pair.slice(0, eq);
    const value = pair.slice(eq + 1);
    // form 인코딩(`Bearer+eyJ...`)의 + 도 공백으로 본다. JWT(base64url)에는 + 가 없다
    if (key === 'jwt' && value) return decodeURIComponent(value.replace(/\+/g, ' '));
  }
  return null;
}

// 시스템 브라우저 로그인 창을 띄운다. 사용자가 닫으면 null.
export async function loginWithGithub(): Promise<string | null> {
  const result = await WebBrowser.openAuthSessionAsync(GITHUB_LOGIN_URL, APP_REDIRECT);
  if (result.type !== 'success') return null;
  const jwt = extractJwt(result.url);
  if (!jwt) throw new Error('로그인 응답에 토큰이 없습니다');
  return jwt;
}
