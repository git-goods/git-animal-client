import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { PixelBox } from './PixelBox';
import { PixelText } from './PixelText';
import { WOOD } from './palette';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  wide?: boolean;
};

const SCALE = 3;

export function PixelButton({ label, onPress, disabled = false, wide = false }: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={wide ? 'self-stretch' : 'self-start'}
    >
      <View
        testID="pixel-button-content"
        style={{ transform: [{ translateY: pressed ? SCALE : 0 }], opacity: disabled ? 0.5 : 1 }}
      >
        <PixelBox scale={SCALE} shadow={!pressed}>
          <PixelText bold style={[{ color: WOOD.ink }, wide && { textAlign: 'center' }]}>{label}</PixelText>
        </PixelBox>
      </View>
    </Pressable>
  );
}
