import { View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { PixelText } from '../ui/pixel';
import type { BubbleSide } from './bubblePlacement';

const S = 3;
const INK = colors.gray['000'];

// 펫 상자 기준 위치. 말풍선 꼬리는 펫 쪽을 가리킨다
export function PetBubble({ text, side, petSize }: { text: string; side: BubbleSide; petSize: number }) {
  const position =
    side === 'top'
      ? { bottom: petSize + S * 2, left: -100 + petSize / 2, width: 200, alignItems: 'center' as const }
      : side === 'right'
        ? { left: petSize, top: petSize / 2 - 15, width: 200, alignItems: 'flex-start' as const }
        : { right: petSize, top: petSize / 2 - 15, width: 200, alignItems: 'flex-end' as const };

  return (
    <View testID="pet-bubble" pointerEvents="none" style={[{ position: 'absolute' }, position]}>
      <View style={{ flexDirection: side === 'top' ? 'column' : side === 'right' ? 'row-reverse' : 'row', alignItems: 'center' }}>
        <View style={{ backgroundColor: colors.white.DEFAULT, borderWidth: S, borderColor: INK, paddingHorizontal: S * 2, paddingVertical: S }}>
          <PixelText variant="glyph12">{text}</PixelText>
        </View>
        <View style={{ width: S * 2, height: S * 2, backgroundColor: INK }} />
      </View>
    </View>
  );
}
