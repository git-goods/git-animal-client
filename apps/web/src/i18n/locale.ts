// 앱은 BCP-47(en-US), 백엔드 API 는 언더스코어(en_US). ApiLocale 변환은 API 경계에서만 한다.

export type ApiLocale = 'en_US' | 'ko_KR';

export function toIntlLocale(locale: string): string {
  return locale.replace('_', '-');
}

export function toSegmentLocale(locale: string): ApiLocale {
  return locale.replace('-', '_') as ApiLocale;
}
