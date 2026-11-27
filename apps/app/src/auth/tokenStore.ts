import * as SecureStore from 'expo-secure-store';

const KEY = 'gitanimals.accessToken';

export const normalizeToken = (token: string) => token.trim().replace(/^Bearer\s+/i, '');

export const tokenStore = {
  get: (): Promise<string | null> => SecureStore.getItemAsync(KEY),
  set: (token: string): Promise<void> => SecureStore.setItemAsync(KEY, normalizeToken(token)),
  clear: (): Promise<void> => SecureStore.deleteItemAsync(KEY),
};
