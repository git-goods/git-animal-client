import { ROUTES } from '../router/constants';

interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}

interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}

class TokenManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    this.loadTokensFromStorage();
    this.setupTokenRefresh();
  }

  private loadTokensFromStorage(): void {
    try {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (accessToken && this.isValidToken(accessToken)) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
      } else {
        this.clearTokens();
      }
    } catch (error) {
      console.error('토큰 로드 실패:', error);
      this.clearTokens();
    }
  }

  public setTokens(accessToken: string, refreshToken?: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken || this.refreshToken;

    // localStorage에 저장
    localStorage.setItem('access_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private isValidToken(token: string): boolean {
    if (!token) return false;

    try {
      const payload = this.decodeToken(token);
      const now = Date.now() / 1000;

      // 만료시간 확인 (5분 여유 두기)
      return payload.exp > now + 300;
    } catch (error) {
      return false;
    }
  }

  private decodeToken(token: string): DecodedToken {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }

  private getTimeUntilExpiry(): number {
    if (!this.accessToken) return 0;

    try {
      const payload = this.decodeToken(this.accessToken);
      const now = Date.now() / 1000;
      return Math.max(0, (payload.exp - now) * 1000);
    } catch (error) {
      return 0;
    }
  }

  private setupTokenRefresh(): void {
    // 기존 타이머가 있으면 정리
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }

    this.refreshTimer = setInterval(() => {
      const timeLeft = this.getTimeUntilExpiry();

      // 만료 5분 전에 갱신
      if (timeLeft > 0 && timeLeft < 5 * 60 * 1000) {
        this.refreshAccessToken();
      }
    }, 60 * 1000); // 1분마다 체크
  }

  public async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) {
      this.clearTokens();
      this.redirectToLogin();
      return false;
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken,
        }),
      });

      if (response.ok) {
        const data: TokenData = await response.json();
        this.setTokens(data.accessToken, data.refreshToken);
        console.log('토큰 갱신 성공');
        return true;
      } else {
        throw new Error('토큰 갱신 실패');
      }
    } catch (error) {
      console.error('토큰 갱신 에러:', error);
      this.clearTokens();
      this.redirectToLogin();
      return false;
    }
  }

  public isAuthenticated(): boolean {
    return !!(this.accessToken && this.isValidToken(this.accessToken));
  }

  private redirectToLogin(): void {
    // webview 환경에서는 부모 앱에 로그인 필요 메시지 전송
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'AUTH_REQUIRED',
          message: 'Authentication required',
        }),
      );
    } else {
      // 일반 웹 환경에서는 로그인 페이지로 리다이렉트
      window.location.href = ROUTES.AUTH;
    }
  }

  public getTokenInfo(): { isValid: boolean; expiresIn: number; token: string | null } {
    return {
      isValid: this.isAuthenticated(),
      expiresIn: this.getTimeUntilExpiry(),
      token: this.accessToken,
    };
  }
}

// 싱글톤 인스턴스
const tokenManager = new TokenManager();

export default tokenManager;
export { TokenManager, type TokenData };
