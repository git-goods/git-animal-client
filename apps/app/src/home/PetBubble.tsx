import { View } from 'react-native';
import { PixelBox, PixelText, WOOD } from '../ui/pixel';

const S = 3;

// 펫 머리 위 가운데. 크림 상자 아래로 두 단 꼬리가 펫을 가리킨다
export function PetBubble({ text, petSize }: { text: string; petSize: number }) {
  return (
    <View
      testID="pet-bubble"
      pointerEvents="none"
      style={{ position: 'absolute', bottom: petSize - S * 4, left: petSize / 2 - 100, width: 200, alignItems: 'center' }}
    >
      <PixelBox shadow={false}>
        <PixelText variant="glyph12" style={{ color: WOOD.ink }}>{text}</PixelText>
      </PixelBox>
      <View style={{ marginTop: -S * 2, width: S * 4, height: S, backgroundColor: WOOD.cream, borderLeftWidth: S, borderRightWidth: S, borderColor: WOOD.outline }} />
      <View style={{ width: S * 2, height: S, backgroundColor: WOOD.outline }} />
    </View>
  );
}
