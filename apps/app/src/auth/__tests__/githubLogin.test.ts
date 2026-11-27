import { extractJwt } from '../githubLogin';

describe('extractJwt', () => {
  it('gitanimals.org 의 /auth?jwt= 에서 토큰을 꺼낸다', () => {
    expect(extractJwt('https://www.gitanimals.org/auth?jwt=abc.def')).toBe('abc.def');
    expect(extractJwt('https://gitanimals.org/ko_KR/auth?foo=1&jwt=Bearer%20xyz')).toBe('Bearer xyz');
  });

  it('다른 호스트나 jwt 가 없는 주소는 무시한다', () => {
    expect(extractJwt('https://gitanimals.org.evil.com/auth?jwt=abc')).toBeNull();
    expect(extractJwt('https://evil.com/https://www.gitanimals.org/auth?jwt=abc')).toBeNull();
    expect(extractJwt('http://www.gitanimals.org/auth?jwt=abc')).toBeNull();
    expect(extractJwt('https://www.gitanimals.org/auth?next=/')).toBeNull();
    expect(extractJwt('https://github.com/login?return_to=https://www.gitanimals.org/auth?jwt=abc')).toBeNull();
  });
});
