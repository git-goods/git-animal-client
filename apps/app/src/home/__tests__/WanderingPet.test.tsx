import { render, screen } from '@testing-library/react-native';
import type { Persona } from '@gitanimals/api';
import { WanderingPet } from '../WanderingPet';

jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  default: { View: jest.requireActual('react-native').View },
  Easing: { linear: 'linear' },
  cancelAnimation: jest.fn(),
  useReducedMotion: () => true,
  useSharedValue: (v: unknown) => ({ value: v }),
  useAnimatedStyle: (fn: () => unknown) => fn(),
  withTiming: (v: unknown) => v,
  withSequence: (v: unknown) => v,
  withRepeat: (v: unknown) => v,
}));

jest.mock('../../ui/pixel', () => ({ PixelSprite: () => null }));

const persona: Persona = { id: 'p1', type: 'PENGUIN', level: '1', visible: true, dropRate: '1', grade: 'DEFAULT' };

describe('WanderingPet', () => {
  afterEach(() => jest.restoreAllMocks());

  it('동작 줄이기에서도 무대 너비가 생기면 임의 위치에 놓는다', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const view = await render(<WanderingPet persona={persona} stageWidth={0} onError={() => {}} />);
    await view.rerender(<WanderingPet persona={persona} stageWidth={440} onError={() => {}} />);
    const style = JSON.stringify(screen.getByTestId('wandering-pet-p1').props.style);
    expect(style).toContain('"translateX":150');
  });
});
