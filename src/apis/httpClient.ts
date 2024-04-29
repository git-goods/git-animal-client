import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

class HttpClient {
  private client: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create(config);

    this.setInterceptor();
  }

  get<T>(...args: Parameters<typeof this.client.get>) {
    return this.client.get<T>(...args);
  }

  post<T>(...args: Parameters<typeof this.client.post>) {
    return this.client.post<T>(...args);
  }

  put<T>(...args: Parameters<typeof this.client.put>) {
    return this.client.put<T>(...args);
  }

  patch<T>(...args: Parameters<typeof this.client.patch>) {
    return this.client.patch<T>(...args);
  }

  delete<T>(...args: Parameters<typeof this.client.delete>) {
    return this.client.delete<T>(...args);
  }

  private setInterceptor() {
    this.client.interceptors.request.use(this.onRequestFulfilled, this.onRequestRejected);
    this.client.interceptors.response.use(this.onResponseFulfilled, this.onResponseRejected);
  }

  private onRequestFulfilled(config: InternalAxiosRequestConfig) {
    return config;
  }

  private onRequestRejected(error: AxiosError) {
    return Promise.reject(error);
  }

  private onResponseFulfilled(response: AxiosResponse) {
    return response;
  }

  private onResponseRejected(error: AxiosError) {
    if (!isAxiosError(error)) return Promise.reject(error);

    return Promise.reject(error.response);
  }
}

export default HttpClient;
