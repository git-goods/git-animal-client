import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { sans } from './sans';

type Props = {
  label: string;
  // ponytail: 상점 뽑기 버튼은 결과 화면(#436)이 붙기 전까지 누를 곳이 없다
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

// 피그마 primary-S: canary 면, 검정 1px 테두리, 위 밝은·아래 어두운 3px 안쪽 띠, 아래 그림자
export function CanaryButton({ label, onPress, disabled = false, style }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          height: 40,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: colors.black.DEFAULT,
          backgroundColor: colors.brand.canary,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
          boxShadow: `0px 4px 2px ${colors.black['25']}`,
        },
        style,
      ]}
    >
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, backgroundColor: '#fdfed2' }} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, backgroundColor: '#c4c382' }} />
      <Text style={[sans(14, 1.5), { color: colors.black.DEFAULT }]}>{label}</Text>
    </Pressable>
  );
}
