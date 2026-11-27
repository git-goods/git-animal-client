export const GITHUB_LOGIN_URL = 'https://api.gitanimals.org/logins/oauth/github/by-redirect-when-success/HOME';

// 로그인 성공 시 백엔드가 보내는 https://www.gitanimals.org[/locale]/auth?jwt=... 에서만 토큰을 꺼낸다.
// RN 의 URL 은 hostname·searchParams 를 지원하지 않아 정규식으로 자른다.
const AUTH_REDIRECT = /^https:\/\/(?:www\.)?gitanimals\.org(?:\/[A-Za-z_-]+)?\/auth\?([^#]*)/;

export function extractJwt(url: string): string | null {
  const query = AUTH_REDIRECT.exec(url)?.[1];
  if (!query) return null;
  for (const pair of query.split('&')) {
    const [key, value] = pair.split('=');
    if (key === 'jwt' && value) return decodeURIComponent(value);
  }
  return null;
}
