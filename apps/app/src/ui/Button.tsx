import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { sans } from './sans';

// 피그마 place-su Button(935:2739). 위·아래 3px 띠 색은 테마 토큰에 없어 여기에만 둔다
const FACES = {
  primary: { face: 'bg-brand-canary', pressed: 'bg-[#eae78a]', top: 'bg-[#fdfed2]', pressedTop: 'bg-[#c4c382]', bottom: 'bg-[#c4c382]' },
  secondary: { face: 'bg-white', pressed: 'bg-gray-900', top: 'bg-[#fdfed2]', pressedTop: 'bg-[#c4c382]', bottom: 'bg-[#a1a1b1]' },
};

// floating 은 피그마에서 좌우 16·위아래 8 여백을 품지만, 여백은 놓는 화면이 준다
const SIZES = {
  small: { box: 'h-8 min-w-20 px-5 self-start', fontSize: 14 },
  medium: { box: 'h-10 min-w-[100px] px-5 self-start', fontSize: 16 },
  large: { box: 'h-[76px] min-w-[100px] px-6 self-start', fontSize: 20 },
  floating: { box: 'h-10 min-w-[100px] px-5 self-stretch', fontSize: 14 },
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
  const { box, fontSize } = SIZES[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      // 피그마 disabled 의 회색 면 대신 흐리게 한다
      className={`flex-row items-center justify-center gap-1 overflow-hidden rounded-[6px] border border-black ${box} ${pressed ? face.pressed : face.face} ${disabled ? 'opacity-50' : ''}`}
      style={{ boxShadow: `0px 4px 2px ${colors['black-alpha']['25']}` }}
    >
      <View className={`absolute inset-x-0 top-0 h-[3px] ${pressed ? face.pressedTop : face.top}`} />
      <View className={`absolute inset-x-0 bottom-0 h-[3px] ${face.bottom}`} />
      <Text className="text-black" style={sans(fontSize, 1.5)}>
        {label}
      </Text>
    </Pressable>
  );
}
