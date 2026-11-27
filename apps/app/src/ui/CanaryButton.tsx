import { Pressable, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { sans } from './sans';

type Props = {
  label: string;
  className?: string;
  onPress: () => void;
  disabled?: boolean;
  tone?: keyof typeof TONE;
};

// 피그마 primary-S 는 canary, secondary-S 는 흰 면에 푸른·회색 띠
const TONE = {
  canary: { face: 'bg-brand-canary', top: 'bg-[#fdfed2]', bottom: 'bg-[#c4c382]' },
  white: { face: 'bg-white', top: 'bg-[#d2dcfe]', bottom: 'bg-[#a1a1b1]' },
};

// 피그마 primary-S: canary 면, 검정 1px 테두리, 위 밝은·아래 어두운 3px 안쪽 띠, 아래 그림자
export function CanaryButton({ label, className = '', onPress, disabled = false, tone = 'canary' }: Props) {
  const { face, top, bottom } = TONE[tone];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`items-center justify-center overflow-hidden rounded-[6px] border border-black ${face} ${disabled ? 'opacity-50' : ''} ${className}`}
      style={{ boxShadow: `0px 4px 2px ${colors['black-alpha']['25']}` }}
    >
      <View className={`absolute inset-x-0 top-0 h-[3px] ${top}`} />
      <View className={`absolute inset-x-0 bottom-0 h-[3px] ${bottom}`} />
      <Text className="text-black" style={sans(14, 1.5)}>
        {label}
      </Text>
    </Pressable>
  );
}
