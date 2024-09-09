import { cookies } from 'next/headers';
import Cookies from 'js-cookie';

const isClient = typeof window !== 'undefined';

export const getCookie = (name: string): string | undefined => {
  if (isClient) {
    return Cookies.get(name);
  } else {
    const cookieStore = cookies();
    return cookieStore.get(name)?.value;
  }
};

export const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes): void => {
  if (isClient) {
    Cookies.set(name, value, options);
  } else {
    const cookieStore = cookies();
    cookieStore.set(name, value);
    // cookieStore.set(name, value, {
    //   ...options,
    //   // Next.js expects maxAge in seconds, js-cookie uses days
    //   maxAge: options?.expires ? Math.floor((options.expires as number) * 24 * 60 * 60) : undefined,
    // });
  }
};

export const removeCookie = (name: string, options?: Cookies.CookieAttributes): void => {
  if (isClient) {
    Cookies.remove(name, options);
  } else {
    const cookieStore = cookies();
    cookieStore.delete(name);
  }
};

const ACCESS_TOKEN_COOKIE_NAME = 'next-auth.session-token';

// Access Token specific functions
export const getAccessToken = (): string | undefined => {
  return getCookie(ACCESS_TOKEN_COOKIE_NAME);
};

export const setAccessToken = (token: string, options?: Cookies.CookieAttributes): void => {
  setCookie(ACCESS_TOKEN_COOKIE_NAME, token, options);
};

export const removeAccessToken = (): void => {
  removeCookie(ACCESS_TOKEN_COOKIE_NAME);
};
