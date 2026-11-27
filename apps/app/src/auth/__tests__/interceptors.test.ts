import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

const mockSetRequest = jest.fn();
const mockSetResponse = jest.fn();
jest.mock('@gitanimals/api', () => ({
  setRequestInterceptor: mockSetRequest,
  setResponseInterceptor: mockSetResponse,
}));

type Request = (c: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
type Rejected = (e: AxiosError) => Promise<never>;

const load = () => {
  let installInterceptors!: typeof import('../interceptors').installInterceptors;
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ({ installInterceptors } = require('../interceptors'));
  });
  return installInterceptors;
};

const config = () => ({ headers: {} }) as unknown as InternalAxiosRequestConfig;

describe('installInterceptors', () => {
  beforeEach(() => jest.clearAllMocks());

  it('토큰이 있으면 Authorization 헤더를 붙인다', () => {
    load()({ getToken: () => 'abc', onUnauthorized: jest.fn() });
    const request: Request = mockSetRequest.mock.calls[0][0];
    expect((request(config()).headers as any).Authorization).toBe('Bearer abc');
  });

  it('토큰이 없으면 헤더를 붙이지 않는다', () => {
    load()({ getToken: () => null, onUnauthorized: jest.fn() });
    const request: Request = mockSetRequest.mock.calls[0][0];
    expect((request(config()).headers as any).Authorization).toBeUndefined();
  });

  it('401 이면 onUnauthorized 를 한 번 부르고 에러를 그대로 reject 한다', async () => {
    const onUnauthorized = jest.fn();
    load()({ getToken: () => 'abc', onUnauthorized });
    const rejected: Rejected = mockSetResponse.mock.calls[0][1];
    const error = { response: { status: 401 } } as AxiosError;
    await expect(rejected(error)).rejects.toBe(error);
    expect(onUnauthorized).toHaveBeenCalledTimes(1);
  });

  it('401 이 아니면 onUnauthorized 를 부르지 않는다', async () => {
    const onUnauthorized = jest.fn();
    load()({ getToken: () => 'abc', onUnauthorized });
    const rejected: Rejected = mockSetResponse.mock.calls[0][1];
    await expect(rejected({ response: { status: 500 } } as AxiosError)).rejects.toBeDefined();
    expect(onUnauthorized).not.toHaveBeenCalled();
  });

  it('두 번 불러도 한 번만 등록한다', () => {
    const install = load();
    install({ getToken: () => null, onUnauthorized: jest.fn() });
    install({ getToken: () => null, onUnauthorized: jest.fn() });
    expect(mockSetRequest).toHaveBeenCalledTimes(1);
    expect(mockSetResponse).toHaveBeenCalledTimes(1);
  });

  it('토큰 복원 뒤 첫 요청에 헤더가 붙는다', () => {
    let token: string | null = null;
    load()({ getToken: () => token, onUnauthorized: jest.fn() });
    const request: Request = mockSetRequest.mock.calls[0][0];
    expect((request(config()).headers as any).Authorization).toBeUndefined();
    token = 'restored';
    expect((request(config()).headers as any).Authorization).toBe('Bearer restored');
  });
});
