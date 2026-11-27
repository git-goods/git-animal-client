import { Image, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { COIN_ROWS, PixelBox, PixelIcon, PixelText } from '../ui/pixel';

type Props = { username: string; points: string; profileImage: string };

const COIN = { X: colors.gray['000'], Y: colors.brand.canary };

export function ProfileBoard({ username, points, profileImage }: Props) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1 flex-row items-center gap-2">
        <View style={{ borderWidth: 3, borderColor: colors.gray['000'] }}>
          <Image source={{ uri: profileImage }} style={{ width: 30, height: 30 }} />
        </View>
        <PixelText variant="glyph20" bold numberOfLines={1} className="flex-shrink text-white">
          {username}
        </PixelText>
      </View>
      <PixelBox scale={3}>
        <View className="flex-row items-center gap-1">
          <PixelIcon rows={COIN_ROWS} palette={COIN} unit={3} />
          <PixelText variant="glyph14" bold>{`${points} P`}</PixelText>
        </View>
      </PixelBox>
    </View>
  );
}
