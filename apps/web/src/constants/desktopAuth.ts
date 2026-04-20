export const DESKTOP_REDIRECT_PATTERN =
  /^http:\/\/(127\.0\.0\.1|localhost):(2333[8-9]|2334[0-2])\/auth\/callback$/;

export function isValidDesktopRedirect(url: string | null | undefined): url is string {
  return typeof url === 'string' && DESKTOP_REDIRECT_PATTERN.test(url);
}

export function buildDesktopCallbackUrl(redirectUri: string, token: string, state: string): string {
  const url = new URL(redirectUri);
  url.searchParams.set('token', token);
  url.searchParams.set('state', state);
  return url.toString();
}
