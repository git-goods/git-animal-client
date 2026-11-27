import { Image, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { sans } from '../ui/sans';

type Props = { username: string; points: string; profileImage: string };

// 피그마 943:18134: 아바타·이름(굵게 24) 과 코인·포인트(16)
export function ProfileBoard({ username, points, profileImage }: Props) {
  return (
    <View className="flex-row items-end justify-between" style={{ paddingHorizontal: 24 }}>
      <View className="flex-1 flex-row items-center" style={{ gap: 8 }}>
        <Image source={{ uri: profileImage }} style={{ width: 32, height: 32, borderRadius: 16 }} />
        <Text numberOfLines={1} className="flex-shrink" style={[sans(24, 1.2, true), { color: colors.white }]}>
          {username}
        </Text>
      </View>
      <View className="flex-row items-center" style={{ gap: 4 }}>
        <Image source={require('../../assets/home/coin.png')} style={{ width: 16, height: 16 }} />
        <Text style={[sans(16, 1.5), { color: colors['white-alpha']['90'] }]}>{`${points} P`}</Text>
      </View>
    </View>
  );
}
