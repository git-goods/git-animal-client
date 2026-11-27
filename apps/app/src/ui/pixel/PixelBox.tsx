import type { ReactNode } from 'react';
import { View } from 'react-native';

type Tone = 'paper' | 'dark';

type Props = {
  tone?: Tone;
  scale?: number;
  shadow?: boolean;
  className?: string;
  children?: ReactNode;
};

// paper: brand-beige 면 + gray-000 테두리, dark: gray-000 면 + gray-400 테두리
const TONE = {
  paper: { border: 'bg-gray-000', fill: 'bg-brand-beige' },
  dark: { border: 'bg-gray-400', fill: 'bg-gray-000' },
} as const;

// 모서리 정사각형을 비운 십자 모양을 겹쳐 그려 배경색과 무관하게 계단 모서리를 만든다
export function PixelBox({ tone = 'paper', scale = 3, shadow = true, className, children }: Props) {
  const s = scale;
  const colors = TONE[tone];

  return (
    // 그림자를 꺼도 자리는 남겨 눌림 상태에서 크기가 바뀌지 않게 한다
    <View testID="pixel-box" className={className} style={{ paddingRight: s, paddingBottom: s }}>
      {shadow && (
        <View testID="pixel-box-shadow" pointerEvents="none" className="absolute" style={{ left: s, top: s, right: 0, bottom: 0 }}>
          <View className="absolute bg-gray-000" style={{ left: 0, right: 0, top: s, bottom: s }} />
          <View className="absolute bg-gray-000" style={{ left: s, right: s, top: 0, bottom: 0 }} />
        </View>
      )}
      <View pointerEvents="none" className="absolute" style={{ left: 0, top: 0, right: s, bottom: s }}>
        <View className={`absolute ${colors.border}`} style={{ left: 0, right: 0, top: s, bottom: s }} />
        <View className={`absolute ${colors.border}`} style={{ left: s, right: s, top: 0, bottom: 0 }} />
        <View className={`absolute ${colors.fill}`} style={{ left: s, right: s, top: s * 2, bottom: s * 2 }} />
        <View className={`absolute ${colors.fill}`} style={{ left: s * 2, right: s * 2, top: s, bottom: s }} />
      </View>
      <View style={{ padding: s * 3 }}>{children}</View>
    </View>
  );
}
