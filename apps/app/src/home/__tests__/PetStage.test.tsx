import { render, screen, waitFor } from '@testing-library/react-native';
import type { Persona } from '@gitanimals/api';
import { PetStage } from '../PetStage';
import i18n from '../../i18n';

// reanimated/mock 은 네이티브 모듈 초기화에서 실패해 쓰는 API 만 직접 대체한다
jest.mock('react-native-reanimated', () => {
  const passthrough = (v: unknown) => v;
  return {
    __esModule: true,
    default: { View: jest.requireActual('react-native').View },
    Easing: { linear: 'linear' },
    cancelAnimation: jest.fn(),
    useReducedMotion: () => false,
    useSharedValue: (v: unknown) => ({ value: v }),
    useAnimatedStyle: () => ({}),
    withTiming: passthrough,
    withSequence: passthrough,
    withRepeat: passthrough,
  };
});

const mockLoadData = jest.fn();
jest.mock('@shopify/react-native-skia', () => ({
  Canvas: 'Canvas',
  Image: 'SkiaImage',
  BlendColor: 'BlendColor',
  FilterMode: { Nearest: 1 },
  MipmapMode: { None: 0 },
  Skia: { Image: { MakeImageFromEncoded: jest.fn() } },
  loadData: (...args: unknown[]) => mockLoadData(...args),
}));

const persona = (id: string, type: string): Persona => ({
  id,
  type,
  level: '1',
  visible: true,
  dropRate: '1',
  grade: 'DEFAULT',
});

describe('PetStage', () => {
  beforeEach(() => mockLoadData.mockReset());

  it('펫이 0마리면 안내 문구를 보여준다', async () => {
    await render(<PetStage personas={[]} fieldTop={0.4} fieldBottom={0.9} />);
    expect(screen.getByText(i18n.t('home.no_visible_pets'))).toBeTruthy();
  });

  it('이미지 로드에 실패한 펫만 무대에서 빠진다', async () => {
    mockLoadData.mockImplementation((source: string, _decode: unknown, onError: () => void) => {
      if (source.endsWith('/PENGUIN')) {
        onError();
        return Promise.resolve(null);
      }
      return Promise.resolve({ width: () => 140, height: () => 140 });
    });

    await render(
      <PetStage personas={[persona('1', 'CAT'), persona('2', 'PENGUIN'), persona('3', 'QUOKKA')]} fieldTop={0.4} fieldBottom={0.9} />,
    );

    await waitFor(() => expect(screen.queryByTestId('wandering-pet-2')).toBeNull());
    expect(screen.getByTestId('wandering-pet-1')).toBeTruthy();
    expect(screen.getByTestId('wandering-pet-3')).toBeTruthy();
    expect(screen.queryByText(i18n.t('home.no_visible_pets'))).toBeNull();
  });
});
