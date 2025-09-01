import { bridge } from '../utils/bridge';

export function setupLogoutHandler() {
  bridge.on('LOGOUT', async () => {
    console.log('Logout request received from app');

    try {
      // 웹뷰 내부 세션 로그아웃
      await fetch('/api/auth/signout', { method: 'POST' });

      // 쿠키 삭제
      document.cookie.split(';').forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });

      // 로컬스토리지 및 세션스토리지 삭제
      localStorage.clear();
      sessionStorage.clear();

      // 로그아웃 완료 알림
      bridge.sendToApp('LOGOUT_COMPLETED');
    } catch (error) {
      console.error('Logout failed:', error);
      // 에러가 있어도 완료 알림
      bridge.sendToApp('LOGOUT_COMPLETED');
    }
  });
}
