import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 지원하는 언어 목록
  locales: ['en', 'ko'],

  // 기본 언어
  defaultLocale: 'en',

  // 로케일 감지 전략 (optional)
  localeDetection: false,

  // 로케일 프리픽스 전략
  localePrefix: 'always',
});

export const config = {
  // 모든 경로에 대해 미들웨어를 실행하도록 설정
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
