import { Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { sans } from '../ui/sans';

const FILL = colors['white-alpha']['75'];

// 피그마 943:21748: 반투명 흰 상자(둥근 4) 와 아래로 향한 세모 꼬리(14×12, 위로 3px 겹침)
export function PetBubble({ text, petSize }: { text: string; petSize: number }) {
  return (
    <View
      testID="pet-bubble"
      pointerEvents="none"
      // ponytail: 펫 PNG 위쪽 여백만큼 내려 머리 위에 붙인다. 펫마다 여백이 다르면 펫별 보정값이 필요하다
      style={{ position: 'absolute', bottom: petSize * 0.7, left: petSize / 2 - 100, width: 200, alignItems: 'center' }}
    >
      <View style={{ backgroundColor: FILL, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2, marginBottom: -3 }}>
        <Text style={[sans(13, 1.4), { color: colors['black-alpha']['90'], textAlign: 'center', maxWidth: 120 }]}>{text}</Text>
      </View>
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 6,
          borderRightWidth: 6,
          borderTopWidth: 9,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: FILL,
        }}
      />
    </View>
  );
}
