import { fireEvent, render, screen } from '@testing-library/react-native';
import { useQuery } from '@tanstack/react-query';
import Home from '../../../app/(tabs)/index';
import i18n from '../../i18n';

jest.mock('@tanstack/react-query', () => ({ useQuery: jest.fn() }));
jest.mock('@gitanimals/react-query', () => ({
  userQueries: {
    userOptions: () => ({ queryKey: ['user'] }),
    allPersonasOptions: () => ({ queryKey: ['personas'] }),
  },
}));
jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0 }) }));
jest.mock('@shopify/react-native-skia', () => ({}));
jest.mock('../PetStage', () => ({ PetStage: () => null }));
jest.mock('../ScoreBoard', () => ({ ScoreBoard: () => null }));
jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockUseQuery = useQuery as jest.Mock;
const refetchUser = jest.fn();
const refetchPersonas = jest.fn();

const userOk = {
  isPending: false,
  isError: false,
  data: { username: 'u', points: '0', profileImage: 'https://x/y.png' },
  refetch: refetchUser,
};
const failed = (refetch: jest.Mock) => ({ isPending: false, isError: true, data: undefined, refetch });

describe('Home 조회 실패', () => {
  beforeEach(() => jest.clearAllMocks());

  it('사용자 조회가 실패하면 로딩 대신 다시 시도 버튼을 보여주고 누르면 refetch 한다', async () => {
    mockUseQuery.mockImplementation((o: { queryKey: string[] }) =>
      o.queryKey[0] === 'homePets' ? { isPending: false, data: null } : o.queryKey[0] === 'user' ? failed(refetchUser) : { isPending: true, isError: false, refetch: refetchPersonas },
    );
    await render(<Home />);
    expect(screen.queryByText(i18n.t('common.loading'))).toBeNull();
    await fireEvent.press(screen.getByText(i18n.t('common.retry')));
    expect(refetchUser).toHaveBeenCalledTimes(1);
  });

  it('펫 조회가 실패하면 펫 없음 대신 다시 시도 버튼을 보여주고 누르면 refetch 한다', async () => {
    mockUseQuery.mockImplementation((o: { queryKey: string[] }) =>
      o.queryKey[0] === 'homePets' ? { isPending: false, data: null } : o.queryKey[0] === 'user' ? userOk : failed(refetchPersonas),
    );
    await render(<Home />);
    expect(screen.queryByText(i18n.t('home.no_visible_pets'))).toBeNull();
    await fireEvent.press(screen.getByText(i18n.t('common.retry')));
    expect(refetchPersonas).toHaveBeenCalledTimes(1);
    expect(refetchUser).not.toHaveBeenCalled();
  });
});
