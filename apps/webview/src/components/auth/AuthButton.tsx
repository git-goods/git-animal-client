import { Button } from '@gitanimals/ui-panda';
import { getGithubOauthUrl } from '../../apis/auth/getGithubOauth';
import { LOCAL_STORAGE_KEY } from '../../constants/storage';
import { authUtils } from '../../utils';

/**
 * WebView용 로그인 함수
 */
export const login = (callbackUrl: string = '/') => {
  // localStorage.setItem(LOCAL_STORAGE_KEY.callbackUrl, callbackUrl);
  getGithubOauthUrl();
};

/**
 * WebView용 로그아웃 함수
 */
export const logout = () => {
  authUtils.logout();
};

/**
 * 로그인 버튼
 */
export function LoginButton({
  label = 'Login',
  callbackUrl = '/',
  ...props
}: {
  label?: string;
  callbackUrl?: string;
  [key: string]: any;
}) {
  const handleLogin = () => {
    console.log('[Auth Debug] LoginButton: Starting GitHub OAuth');
    login(callbackUrl);
  };

  return (
    <Button onClick={handleLogin} {...props}>
      {label}
    </Button>
  );
}

/**
 * 로그아웃 버튼
 */
export function LogoutButton({ label = 'Logout', ...props }: { label?: string; [key: string]: any }) {
  const handleLogout = () => {
    console.log('[Auth Debug] LogoutButton: Logging out');
    logout();
  };

  return (
    <Button onClick={handleLogout} {...props}>
      {label}
    </Button>
  );
}
