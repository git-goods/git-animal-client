export const APP_USER_AGENT = '10mm.today.app';
export const ANDROID = 'android|Android';
export const IOS = 'iPhone|iPad|iPod';

export const AUTH_PROVIDER = {
  KAKAO: 'KAKAO',
  APPLE: 'APPLE',
} as const;

export const WINDOW_CUSTOM_EVENT = {
  APPLE_ID_SIGN_IN_ON_SUCCESS: 'AppleIDSignInOnSuccess',
};

const getUserAgent = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.navigator.userAgent;
};

// Todo 테스트 코드 추가 예정
export const isWebView = () => RegExp(APP_USER_AGENT).test(getUserAgent());
export const isAndroid = () => RegExp(ANDROID).test(getUserAgent());
export const isIOS = () => RegExp(IOS).test(getUserAgent());

type EnvType = 'local' | 'dev' | 'real';

export const getEnv = (): EnvType => {
  if (process.env.node_env === 'development') {
    return 'local';
  }

  if (process.env.NEXT_PUBLIC_ENV === 'real') {
    return 'real';
  }

  return 'dev';
};
