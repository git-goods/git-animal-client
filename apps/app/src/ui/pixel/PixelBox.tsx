import type { ReactNode } from 'react';
import { View } from 'react-native';
import { WOOD } from './palette';

type Tone = 'paper' | 'wood' | 'gold';

type Props = {
  tone?: Tone;
  scale?: number;
  // 아래쪽 두꺼운 테두리(눌리기 전 버튼의 두께). 꺼도 자리는 남는다
  shadow?: boolean;
  className?: string;
  children?: ReactNode;
};

const TONE = {
  paper: { outline: WOOD.outline, edge: WOOD.dark, fill: WOOD.cream },
  wood: { outline: WOOD.outline, edge: WOOD.dark, fill: WOOD.light },
  // 고른 상태: 금색 테두리
  gold: { outline: WOOD.goldEdge, edge: WOOD.gold, fill: WOOD.cream },
} as const;

// 모서리 한 칸을 비운 십자 두 장으로 둥근 픽셀 사각형을 만든다
function Rounded({ inset, color, s, bottom = inset }: { inset: number; color: string; s: number; bottom?: number }) {
  return (
    <>
      <View className="absolute" style={{ backgroundColor: color, left: inset, right: inset, top: inset + s, bottom: bottom + s }} />
      <View className="absolute" style={{ backgroundColor: color, left: inset + s, right: inset + s, top: inset, bottom }} />
    </>
  );
}

export function PixelBox({ tone = 'paper', scale = 3, shadow = true, className, children }: Props) {
  const s = scale;
  const c = TONE[tone];
  return (
    <View testID="pixel-box" className={className} style={{ paddingBottom: s }}>
      <View pointerEvents="none" className="absolute inset-0">
        {shadow && (
          <View testID="pixel-box-shadow" className="absolute inset-0">
            <Rounded inset={0} color={c.outline} s={s} />
          </View>
        )}
        <View className="absolute inset-x-0 top-0" style={{ bottom: s }}>
          <Rounded inset={0} color={c.outline} s={s} />
          <Rounded inset={s} color={c.edge} s={s} />
          <Rounded inset={s} bottom={s * 2} color={c.fill} s={s} />
        </View>
      </View>
      <View style={{ padding: s * 3 }}>{children}</View>
    </View>
  );
}
