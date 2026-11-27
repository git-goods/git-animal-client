import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { Button } from '../Button';

const face = () => StyleSheet.flatten(screen.getByRole('button', { name: '저장' }).props.style).backgroundColor;

test('누르는 동안 면이 hover 색으로 바뀐다', async () => {
  await render(<Button label="저장" onPress={jest.fn()} />);
  expect(face()).toBe(colors.brand.canary);
  await fireEvent(screen.getByRole('button', { name: '저장' }), 'pressIn');
  expect(face()).toBe('#eae78a');
  await fireEvent(screen.getByRole('button', { name: '저장' }), 'pressOut');
  expect(face()).toBe(colors.brand.canary);
});

test('disabled 면 흐려지고 onPress 를 부르지 않는다', async () => {
  const onPress = jest.fn();
  await render(<Button label="저장" onPress={onPress} disabled />);
  expect(StyleSheet.flatten(screen.getByRole('button', { name: '저장' }).props.style).opacity).toBe(0.5);
  await fireEvent.press(screen.getByRole('button', { name: '저장' }));
  expect(onPress).not.toHaveBeenCalled();
});
