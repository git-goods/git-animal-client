import ky, { type KyInstance, type Options } from "ky";

import { authUtils } from "@/lib/auth";

const API_URL = "https://api.gitanimals.org";

class HttpClient {
  private instance: KyInstance;
  private requestHooks: Array<(request: Request) => Request | Promise<Request>> = [];
  private responseHooks: Array<(response: Response) => Response | Promise<Response>> = [];

  constructor(baseURL: string, options?: Options) {
    this.instance = ky.create({
      prefixUrl: baseURL,
      timeout: 15000,
      ...options,
      hooks: {
        beforeRequest: [
          async (request) => {
            let modifiedRequest = request;
            for (const hook of this.requestHooks) {
              modifiedRequest = await hook(modifiedRequest);
            }
            return modifiedRequest;
          },
        ],
        afterResponse: [
          async (_request, _options, response) => {
            let modifiedResponse = response;
            for (const hook of this.responseHooks) {
              modifiedResponse = await hook(modifiedResponse);
            }
            return modifiedResponse;
          },
        ],
      },
    });

    // 인터셉터 자동 등록
    this.setRequestInterceptor(requestInterceptor);
    this.setResponseInterceptor(responseInterceptor);
  }

  setRequestInterceptor(hook: (request: Request) => Request | Promise<Request>) {
    this.requestHooks.push(hook);
  }

  setResponseInterceptor(hook: (response: Response) => Response | Promise<Response>) {
    this.responseHooks.push(hook);
  }

  getClient() {
    return this.instance;
  }
}

// Request Interceptor
const requestInterceptor = async (request: Request): Promise<Request> => {
  if (typeof window === "undefined") return request;

  const token = authUtils.getToken();
  console.log("token", token);
  if (!token) return request;

  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${token}`);

  return new Request(request, { headers });
};

// Response Interceptor
const responseInterceptor = async (response: Response): Promise<Response> => {
  if (response.ok) {
    return response;
  }

  if (response.status === 401) {
    authUtils.removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  if (response.status === 403) {
    console.error("접근 권한이 없습니다.");
  }

  return response;
};

const httpClient = new HttpClient(API_URL);

export const apiClient = httpClient.getClient();

export const api = {
  get: <T>(url: string, options?: Options) => apiClient.get(url, options).json<T>(),
  post: <T>(url: string, options?: Options) => apiClient.post(url, options).json<T>(),
  put: <T>(url: string, options?: Options) => apiClient.put(url, options).json<T>(),
  patch: <T>(url: string, options?: Options) => apiClient.patch(url, options).json<T>(),
  delete: <T>(url: string, options?: Options) => apiClient.delete(url, options).json<T>(),
};
