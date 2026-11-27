import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from '../Button';

// jest 에선 NativeWind 가 className 을 style 로 바꾸지 않아 클래스로 본다
const classes = () => screen.getByRole('button', { name: '저장' }).props.className as string;

test('누르는 동안 면이 hover 색으로 바뀐다', async () => {
  await render(<Button label="저장" onPress={jest.fn()} />);
  expect(classes()).toContain('bg-brand-canary');
  await fireEvent(screen.getByRole('button', { name: '저장' }), 'pressIn');
  expect(classes()).toContain('bg-[#eae78a]');
  await fireEvent(screen.getByRole('button', { name: '저장' }), 'pressOut');
  expect(classes()).toContain('bg-brand-canary');
});

test('disabled 면 흐려지고 onPress 를 부르지 않는다', async () => {
  const onPress = jest.fn();
  await render(<Button label="저장" onPress={onPress} disabled />);
  expect(classes()).toContain('opacity-50');
  await fireEvent.press(screen.getByRole('button', { name: '저장' }));
  expect(onPress).not.toHaveBeenCalled();
});
