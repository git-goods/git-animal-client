import tokenManager from './tokenManager';

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

class ApiError extends Error {
  status: number;
  data?: any;

  constructor({ message, status, data }: { message: string; status: number; data?: any }) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string = '/api', timeout: number = 10000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private getHeaders(customHeaders?: HeadersInit): HeadersInit {
    const token = tokenManager.getAccessToken();
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    return { ...defaultHeaders, ...customHeaders };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders(options.headers),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError({
          message: response.statusText,
          status: response.status,
          data: errorData,
        });
      }

      const data = await response.json();
      
      return {
        data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }
}

// 싱글톤 API 클라이언트 인스턴스
const apiClient = new ApiClient();

// 인증 관련 API 함수들
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', credentials);
    const data = response.data as { accessToken?: string; refreshToken?: string };
    
    if (data.accessToken) {
      tokenManager.setTokens(data.accessToken, data.refreshToken);
    }
    
    return response.data;
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    } finally {
      tokenManager.clearTokens();
    }
  },

  getCurrentUser: () => apiClient.get('/user/me'),
};

// 일반 API 사용 예시
export const userAPI = {
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: (data: any) => apiClient.put('/user/profile', data),
  getUsers: () => apiClient.get('/users'),
  createUser: (data: any) => apiClient.post('/users', data),
};

export default apiClient;
export { ApiClient, type ApiResponse, type ApiError };