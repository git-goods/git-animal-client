import { fireEvent, render, screen } from '@testing-library/react-native';
import type { Persona } from '@gitanimals/api';
import { WanderingPet } from '../WanderingPet';
import i18n from '../../i18n';

jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  default: { View: jest.requireActual('react-native').View },
  Easing: { linear: 'linear' },
  cancelAnimation: jest.fn(),
  useReducedMotion: () => true,
  useSharedValue: (v: unknown) => jest.requireActual('react').useRef({ value: v }).current,
  useAnimatedStyle: (fn: () => unknown) => fn(),
  withTiming: (v: unknown) => v,
  withSequence: (v: unknown) => v,
  withRepeat: (v: unknown) => v,
}));

jest.mock('../../ui/pixel', () => ({ PixelSprite: () => null }));

const persona: Persona = { id: 'p1', type: 'PENGUIN', level: '1', visible: true, dropRate: '1', grade: 'DEFAULT' };

const field = { minX: 0, maxX: 320, minY: 300, maxY: 600 };

describe('WanderingPet', () => {
  afterEach(() => jest.restoreAllMocks());

  it('동작 줄이기에서도 영역이 생기면 영역 안 임의 위치에 놓는다', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const view = await render(<WanderingPet persona={persona} field={null} onError={() => {}} />);
    await view.rerender(<WanderingPet persona={persona} field={field} onError={() => {}} />);
    // 효과가 정한 위치는 다음 렌더의 스타일에 반영된다
    await view.rerender(<WanderingPet persona={persona} field={field} onError={() => {}} />);
    const style = JSON.stringify(screen.getByTestId('wandering-pet-p1').props.style);
    expect(style).toContain('"translateX":159');
    expect(style).toContain('"translateY":450');
  });

  it('누르면 인사 말풍선이 뜬다', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    await render(<WanderingPet persona={persona} field={field} onError={() => {}} />);
    expect(screen.queryByTestId('pet-bubble')).toBeNull();
    await fireEvent.press(screen.getByLabelText('PENGUIN'));
    expect(screen.getByTestId('pet-bubble')).toBeTruthy();
    expect(screen.getByText((i18n.t('home.greetings', { returnObjects: true }) as string[])[0])).toBeTruthy();
  });
});
