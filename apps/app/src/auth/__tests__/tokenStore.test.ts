import * as SecureStore from 'expo-secure-store';
import { tokenStore } from '../tokenStore';

jest.mock('expo-secure-store', () => {
  const data = new Map<string, string>();
  return {
    setItemAsync: jest.fn(async (k: string, v: string) => void data.set(k, v)),
    getItemAsync: jest.fn(async (k: string) => data.get(k) ?? null),
    deleteItemAsync: jest.fn(async (k: string) => void data.delete(k)),
  };
});

describe('tokenStore', () => {
  beforeEach(async () => {
    await tokenStore.clear();
    jest.clearAllMocks();
  });

  it('저장한 토큰을 읽는다', async () => {
    await tokenStore.set('abc');
    expect(await tokenStore.get()).toBe('abc');
  });

  it('clear 후에는 null 이다', async () => {
    await tokenStore.set('abc');
    await tokenStore.clear();
    expect(await tokenStore.get()).toBeNull();
  });

  it('SecureStore 의 gitanimals.accessToken 키로 저장한다', async () => {
    await tokenStore.set('abc');
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('gitanimals.accessToken', 'abc');
  });

  it('Bearer 접두어는 떼고 저장한다', async () => {
    await tokenStore.set('Bearer abc');
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('gitanimals.accessToken', 'abc');
    expect(await tokenStore.get()).toBe('abc');
  });
});
