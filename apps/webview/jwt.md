// tokenManager.js - 실용적인 JWT 관리
class TokenManager {
constructor() {
this.accessToken = null;
this.refreshToken = null;
this.init();
}

init() {
// 앱 시작 시 localStorage에서 토큰 복원
this.loadTokensFromStorage();
this.setupTokenRefresh();
}

// localStorage에서 토큰 로드
loadTokensFromStorage() {
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

// 토큰 저장 (메모리 + localStorage)
setTokens(accessToken, refreshToken = null) {
this.accessToken = accessToken;
this.refreshToken = refreshToken || this.refreshToken;

    // localStorage에 저장
    localStorage.setItem('access_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }

}

// 토큰 반환
getAccessToken() {
return this.accessToken;
}

getRefreshToken() {
return this.refreshToken;
}

// 토큰 삭제
clearTokens() {
this.accessToken = null;
this.refreshToken = null;
localStorage.removeItem('access_token');
localStorage.removeItem('refresh_token');
}

// JWT 토큰 유효성 검사 (간단한 디코딩)
isValidToken(token) {
if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;

      // 만료시간 확인 (5분 여유 두기)
      return payload.exp > (now + 300);
    } catch (error) {
      return false;
    }

}

// 토큰 만료까지 남은 시간 (밀리초)
getTimeUntilExpiry() {
if (!this.accessToken) return 0;

    try {
      const payload = JSON.parse(atob(this.accessToken.split('.')[1]));
      const now = Date.now() / 1000;
      return Math.max(0, (payload.exp - now) * 1000);
    } catch (error) {
      return 0;
    }

}

// 자동 토큰 갱신 설정
setupTokenRefresh() {
setInterval(() => {
const timeLeft = this.getTimeUntilExpiry();

      // 만료 5분 전에 갱신
      if (timeLeft > 0 && timeLeft < 5 * 60 * 1000) {
        this.refreshAccessToken();
      }
    }, 60 * 1000); // 1분마다 체크

}

// 토큰 갱신
async refreshAccessToken() {
if (!this.refreshToken) {
this.clearTokens();
window.location.href = '/login';
return;
}

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.setTokens(data.accessToken, data.refreshToken);
        console.log('토큰 갱신 성공');
      } else {
        throw new Error('토큰 갱신 실패');
      }
    } catch (error) {
      console.error('토큰 갱신 에러:', error);
      this.clearTokens();
      window.location.href = '/login';
    }

}

// 인증 상태 확인
isAuthenticated() {
return this.accessToken && this.isValidToken(this.accessToken);
}
}

// 싱글톤 인스턴스
const tokenManager = new TokenManager();

// Axios 설정
import axios from 'axios';

const apiClient = axios.create({
baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
timeout: 10000,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
(config) => {
const token = tokenManager.getAccessToken();
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
},
(error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
(response) => response,
async (error) => {
const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await tokenManager.refreshAccessToken();

        // 새 토큰으로 재시도
        const newToken = tokenManager.getAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // 갱신 실패 시 로그인 페이지로
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);

}
);

// 인증 API
export const authAPI = {
// 로그인
login: async (credentials) => {
const response = await axios.post('/api/auth/login', credentials);
const { accessToken, refreshToken, expiresIn } = response.data;

    tokenManager.setTokens(accessToken, refreshToken);
    return response.data;

},

// 로그아웃
logout: async () => {
try {
// 서버에 로그아웃 요청 (선택사항)
await apiClient.post('/auth/logout');
} catch (error) {
console.error('서버 로그아웃 실패:', error);
} finally {
tokenManager.clearTokens();
}
},

// 현재 사용자 정보
getCurrentUser: () => apiClient.get('/user/me'),
};

// 일반 API 사용 예시
export const userAPI = {
getProfile: () => apiClient.get('/user/profile'),
updateProfile: (data) => apiClient.put('/user/profile', data),
getUsers: () => apiClient.get('/users'),
createUser: (data) => apiClient.post('/users', data),
};

// 유틸리티 함수들
export const authUtils = {
isAuthenticated: () => tokenManager.isAuthenticated(),
getToken: () => tokenManager.getAccessToken(),
logout: () => {
tokenManager.clearTokens();
window.location.href = '/login';
}
};

export { tokenManager, apiClient };
