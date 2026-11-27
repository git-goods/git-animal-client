import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { PixelButton } from '../PixelButton';

const content = () => StyleSheet.flatten(screen.getByTestId('pixel-button-content').props.style);

describe('PixelButton', () => {
  it('평소에는 그림자가 있고 내용은 제자리에 있다', async () => {
    await render(<PixelButton label="입양하기" onPress={jest.fn()} />);
    expect(screen.getByTestId('pixel-box-shadow')).toBeTruthy();
    expect(content().transform).toEqual([{ translateY: 0 }]);
  });

  it('누르는 동안 내용이 3px 내려가고 그림자가 사라진다', async () => {
    await render(<PixelButton label="입양하기" onPress={jest.fn()} />);
    await fireEvent(screen.getByText('입양하기'), 'pressIn');
    expect(content().transform).toEqual([{ translateY: 3 }]);
    expect(screen.queryByTestId('pixel-box-shadow')).toBeNull();

    await fireEvent(screen.getByText('입양하기'), 'pressOut');
    expect(screen.getByTestId('pixel-box-shadow')).toBeTruthy();
  });

  it('누르면 onPress 를 부른다', async () => {
    const onPress = jest.fn();
    await render(<PixelButton label="입양하기" onPress={onPress} />);
    await fireEvent.press(screen.getByText('입양하기'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disabled 면 onPress 를 부르지 않는다', async () => {
    const onPress = jest.fn();
    await render(<PixelButton label="입양하기" onPress={onPress} disabled />);
    await fireEvent.press(screen.getByText('입양하기'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
