export const ROUTES = {
  // 보호된 라우트들 (인증 필요)
  HOME: '/',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // 공개 라우트들 (인증 불필요)
  AUTH: '/auth',
  ABOUT: '/about',
} as const;

// 중첩 라우트용 함수들
export const NESTED_PATHS = {
  HOME: () => '',
  PROFILE: () => 'profile',
  SETTINGS: () => 'settings',
  AUTH: () => 'auth',
  ABOUT: () => 'about',
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.AUTH,
  ROUTES.ABOUT,
] as const;

export const PROTECTED_ROUTES = [
  ROUTES.HOME,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
] as const;