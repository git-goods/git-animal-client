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

enum TokenState {
  INITIALIZING = 'initializing',
  READY = 'ready',
  INVALID = 'invalid',
}

class TokenManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;
  private tokenState: TokenState = TokenState.INITIALIZING;
  private waitingPromises: Array<{ resolve: () => void; reject: (error: Error) => void }> = [];

  constructor() {
    this.init();
  }

  private init(): void {
    this.loadTokensFromStorage();
    this.setupTokenRefresh();

    // webview 환경에서는 부모로부터 토큰을 받기를 기다림
    if (window.ReactNativeWebView && !this.accessToken) {
      this.requestTokenFromParent();
      // webview에서는 토큰 요청 후에도 INITIALIZING 상태 유지
      // 부모로부터 토큰을 받으면 setTokens에서 READY로 변경됨
    } else {
      this.setTokenState(this.accessToken ? TokenState.READY : TokenState.INVALID);
    }
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

  private setTokenState(state: TokenState): void {
    this.tokenState = state;

    if (state === TokenState.READY || state === TokenState.INVALID) {
      // 대기 중인 Promise들 해결
      this.waitingPromises.forEach(({ resolve, reject }) => {
        if (state === TokenState.READY) {
          resolve();
        } else {
          reject(new Error('Token is not available'));
        }
      });
      this.waitingPromises = [];
    }
  }

  private requestTokenFromParent(): void {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'REQUEST_AUTH',
          message: 'Token required for API requests',
        }),
      );
    }
  }

  /**
   * 토큰이 준비될 때까지 대기
   */
  public waitForToken(): Promise<void> {
    if (this.tokenState === TokenState.READY && this.accessToken) {
      return Promise.resolve();
    }

    if (this.tokenState === TokenState.INVALID) {
      return Promise.reject(new Error('Token is not available'));
    }

    // INITIALIZING 상태인 경우 토큰이 준비될 때까지 대기
    return new Promise((resolve, reject) => {
      this.waitingPromises.push({ resolve, reject });

      // webview 환경에서는 더 긴 타임아웃 설정 (30초)
      const timeout = window.ReactNativeWebView ? 30000 : 10000;
      setTimeout(() => {
        const index = this.waitingPromises.findIndex((p) => p.resolve === resolve);
        if (index !== -1) {
          this.waitingPromises.splice(index, 1);
          reject(new Error(`Token wait timeout after ${timeout / 1000}s`));
        }
      }, timeout);
    });
  }

  public setTokens(accessToken: string, refreshToken?: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken || this.refreshToken;

    // localStorage에 저장
    localStorage.setItem('access_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }

    // 토큰이 설정되면 상태를 READY로 변경
    this.setTokenState(TokenState.READY);
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

    // 토큰이 클리어되면 상태를 INVALID로 변경
    this.setTokenState(TokenState.INVALID);
  }

  private isValidToken(token: string): boolean {
    if (!token) return false;

    try {
      const payload = this.decodeToken(token);
      const now = Date.now() / 1000;

      // 만료시간 확인 (5분 여유 두기)
      return payload.exp > now + 300;
    } catch (error) {
      console.error('[TokenManager] Token validation error:', error);
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

  public getTokenInfo(): { isValid: boolean; expiresIn: number; token: string | null; state: TokenState } {
    return {
      isValid: this.isAuthenticated(),
      expiresIn: this.getTimeUntilExpiry(),
      token: this.accessToken,
      state: this.tokenState,
    };
  }

  public getTokenState(): TokenState {
    return this.tokenState;
  }

  public isTokenReady(): boolean {
    return this.tokenState === TokenState.READY && !!this.accessToken;
  }
}

// 싱글톤 인스턴스
const tokenManager = new TokenManager();

export default tokenManager;
export { TokenManager, TokenState, type TokenData };
