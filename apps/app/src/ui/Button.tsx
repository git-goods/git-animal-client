import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { sans } from './sans';

// 피그마 place-su Button(935:2739). 위·아래 3px 띠 색은 테마 토큰에 없어 여기에만 둔다
const FACES = {
  primary: { face: colors.brand.canary, pressed: '#eae78a', top: '#fdfed2', pressedTop: '#c4c382', bottom: '#c4c382' },
  secondary: { face: colors.white, pressed: colors.gray['900'], top: '#fdfed2', pressedTop: '#c4c382', bottom: '#a1a1b1' },
};

// floating 은 피그마에서 좌우 16·위아래 8 여백을 품지만, 여백은 놓는 화면이 준다
const SIZES = {
  small: { height: 32, paddingHorizontal: 20, minWidth: 80, fontSize: 14 },
  medium: { height: 40, paddingHorizontal: 20, minWidth: 100, fontSize: 16 },
  large: { height: 76, paddingHorizontal: 24, minWidth: 100, fontSize: 20 },
  floating: { height: 40, paddingHorizontal: 20, minWidth: 100, fontSize: 14 },
};

type Props = {
  label: string;
  onPress: () => void;
  variant?: keyof typeof FACES;
  size?: keyof typeof SIZES;
  disabled?: boolean;
};

export function Button({ label, onPress, variant = 'primary', size = 'medium', disabled = false }: Props) {
  // NativeWind 가 감싼 Pressable 은 함수형 style 을 버려서 눌림 상태를 직접 든다
  const [pressed, setPressed] = useState(false);
  const face = FACES[variant];
  const { fontSize, ...box } = SIZES[size];
  const colorsNow = { face: pressed ? face.pressed : face.face, top: pressed ? face.pressedTop : face.top, bottom: face.bottom };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        ...box,
        alignSelf: size === 'floating' ? 'stretch' : 'flex-start',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.black,
        backgroundColor: colorsNow.face,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        // 피그마 disabled 의 회색 면 대신 흐리게 한다
        opacity: disabled ? 0.5 : 1,
        boxShadow: `0px 4px 2px ${colors['black-alpha']['25']}`,
      }}
    >
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, backgroundColor: colorsNow.top }} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, backgroundColor: colorsNow.bottom }} />
      <Text style={[sans(fontSize, 1.5), { color: colors.black }]}>{label}</Text>
    </Pressable>
  );
}
