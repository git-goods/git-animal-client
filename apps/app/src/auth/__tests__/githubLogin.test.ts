import * as WebBrowser from 'expo-web-browser';
import { extractJwt, loginWithGithub } from '../githubLogin';

jest.mock('expo-web-browser', () => ({ openAuthSessionAsync: jest.fn() }));
const open = WebBrowser.openAuthSessionAsync as jest.Mock;

describe('extractJwt', () => {
  it('gitanimals://auth?jwt= 에서 토큰을 꺼낸다', () => {
    expect(extractJwt('gitanimals://auth?jwt=abc.def')).toBe('abc.def');
    expect(extractJwt('gitanimals://auth?x=1&jwt=Bearer%20xyz')).toBe('Bearer xyz');
  });

  it('다른 주소나 jwt 가 없는 주소는 무시한다', () => {
    expect(extractJwt('gitanimals://evil?jwt=abc')).toBeNull();
    expect(extractJwt('https://www.gitanimals.org/auth?jwt=abc')).toBeNull();
    expect(extractJwt('gitanimals://auth?next=/')).toBeNull();
  });
});

describe('loginWithGithub', () => {
  it('사용자가 창을 닫으면 null', async () => {
    open.mockResolvedValueOnce({ type: 'cancel' });
    await expect(loginWithGithub()).resolves.toBeNull();
  });

  it('성공하면 jwt 를 돌려준다', async () => {
    open.mockResolvedValueOnce({ type: 'success', url: 'gitanimals://auth?jwt=tok' });
    await expect(loginWithGithub()).resolves.toBe('tok');
  });

  it('토큰 없이 돌아오면 실패로 알린다', async () => {
    open.mockResolvedValueOnce({ type: 'success', url: 'gitanimals://auth' });
    await expect(loginWithGithub()).rejects.toThrow();
  });
});
