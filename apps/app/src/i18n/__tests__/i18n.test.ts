import { pickLanguage } from '../index';

describe('pickLanguage', () => {
  it('영어 로케일은 en', () => {
    expect(pickLanguage(['en-US'])).toBe('en');
  });

  it('한국어 로케일은 ko', () => {
    expect(pickLanguage(['ko-KR'])).toBe('ko');
  });

  it('지원하지 않는 언어는 ko', () => {
    expect(pickLanguage(['ja-JP'])).toBe('ko');
  });

  it('빈 목록은 ko', () => {
    expect(pickLanguage([])).toBe('ko');
  });

  it('우선순위 순서에서 지원하는 첫 언어를 고른다', () => {
    expect(pickLanguage(['ja-JP', 'en-GB'])).toBe('en');
  });
});
