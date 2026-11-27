import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react-native';
import { getUser } from '@gitanimals/api';
import { AuthProvider, useAuth } from '../AuthProvider';
import { tokenStore } from '../tokenStore';

jest.mock('@gitanimals/api', () => ({
  getUser: jest.fn(),
  setRequestInterceptor: jest.fn(),
  setResponseInterceptor: jest.fn(),
}));
jest.mock('../tokenStore', () => ({
  ...jest.requireActual('../tokenStore'),
  tokenStore: { get: jest.fn(), set: jest.fn(), clear: jest.fn() },
}));

const mockGetUser = getUser as jest.Mock;
const store = tokenStore as jest.Mocked<typeof tokenStore>;

function Probe() {
  const { status } = useAuth();
  return <Text>{status}</Text>;
}

const renderProvider = (client = new QueryClient()) =>
  render(
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Probe />
      </AuthProvider>
    </QueryClientProvider>,
  );

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.clear.mockResolvedValue();
  });

  it('저장된 토큰이 없으면 signedOut 이다', async () => {
    store.get.mockResolvedValue(null);
    await renderProvider();
    await waitFor(() => expect(screen.getByText('signedOut')).toBeTruthy());
    expect(mockGetUser).not.toHaveBeenCalled();
  });

  it('저장된 토큰이 getUser 401 이면 signedOut 이 되고 토큰을 지운다', async () => {
    store.get.mockResolvedValue('stale');
    mockGetUser.mockRejectedValue({ response: { status: 401 } });
    await renderProvider();
    await waitFor(() => expect(screen.getByText('signedOut')).toBeTruthy());
    expect(store.clear).toHaveBeenCalled();
  });

  it('로그아웃하면 queryClient 도 비운다', async () => {
    store.get.mockResolvedValue('stale');
    mockGetUser.mockRejectedValue({ response: { status: 401 } });
    const client = new QueryClient();
    const clear = jest.spyOn(client, 'clear');
    await renderProvider(client);
    await waitFor(() => expect(screen.getByText('signedOut')).toBeTruthy());
    expect(clear).toHaveBeenCalled();
  });

  it('getUser 가 성공하기 전에는 loading 이다', async () => {
    store.get.mockResolvedValue('ok');
    mockGetUser.mockReturnValue(new Promise(() => {}));
    await renderProvider();
    expect(screen.getByText('loading')).toBeTruthy();
  });

  it('getUser 가 성공하면 signedIn 이다', async () => {
    store.get.mockResolvedValue('ok');
    mockGetUser.mockResolvedValue({ id: '1' });
    await renderProvider();
    await waitFor(() => expect(screen.getByText('signedIn')).toBeTruthy());
    expect(store.clear).not.toHaveBeenCalled();
  });

  it('네트워크 오류(401 아님)면 토큰을 유지하고 signedIn 이다', async () => {
    store.get.mockResolvedValue('ok');
    mockGetUser.mockRejectedValue(new Error('Network Error'));
    await renderProvider();
    await waitFor(() => expect(screen.getByText('signedIn')).toBeTruthy());
    expect(store.clear).not.toHaveBeenCalled();
  });

  it('저장소 읽기가 실패해도 loading 에 머무르지 않고 signedOut 이다', async () => {
    store.get.mockRejectedValue(new Error('Keystore decrypt failed'));
    await renderProvider();
    await waitFor(() => expect(screen.getByText('signedOut')).toBeTruthy());
    expect(store.clear).toHaveBeenCalled();
  });
});
