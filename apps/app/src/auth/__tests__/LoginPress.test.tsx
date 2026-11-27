import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import Login from '../../../app/(auth)/login';
import i18n from '../../i18n';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0 }) }));
jest.mock('@shopify/react-native-skia', () => ({}));
jest.mock('react-native-reanimated', () => ({
  useReducedMotion: () => true,
  useSharedValue: (v: unknown) => ({ value: v }),
  useAnimatedStyle: (fn: () => unknown) => fn(),
}));
jest.mock('../../home/WanderingPet', () => ({ AnimatedView: jest.requireActual('react-native').View, GRID: 3 }));
jest.mock('../../ui/pixel', () => ({ PixelBox: () => null, PixelButton: () => null, PixelSprite: () => null, PixelText: () => null }));
jest.mock('../AuthProvider', () => ({ useAuth: () => ({ signIn: jest.fn() }) }));
jest.mock('../githubLogin', () => ({ loginWithGithub: jest.fn() }));

test('GitHub 버튼은 누르는 동안 흐려진다', async () => {
  await render(<Login />);
  const button = screen.getByRole('button', { name: i18n.t('auth.github_login') });
  const opacity = () =>
    StyleSheet.flatten(screen.getByRole('button', { name: i18n.t('auth.github_login') }).props.style).opacity;
  expect(opacity()).toBe(1);
  await fireEvent(button, 'pressIn');
  expect(opacity()).toBe(0.7);
  await fireEvent(button, 'pressOut');
  expect(opacity()).toBe(1);
});
