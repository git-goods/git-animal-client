const ADMIN_TOKEN = 'gitanimals-admin-token';

export const getToken = () => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  return window.localStorage.getItem(ADMIN_TOKEN);
};

export const setToken = (token: string) => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  window.localStorage.setItem(ADMIN_TOKEN, token);
};
