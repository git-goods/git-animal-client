import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { PixelBox } from './PixelBox';
import { PixelText } from './PixelText';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

const SCALE = 3;

export function PixelButton({ label, onPress, disabled = false }: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className="self-start"
    >
      <View
        testID="pixel-button-content"
        style={{ transform: [{ translateY: pressed ? SCALE : 0 }], opacity: disabled ? 0.5 : 1 }}
      >
        <PixelBox scale={SCALE} shadow={!pressed}>
          <PixelText bold>{label}</PixelText>
        </PixelBox>
      </View>
    </Pressable>
  );
}
