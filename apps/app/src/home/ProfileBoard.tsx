import { Image, View } from 'react-native';
import { COIN_ROWS, PixelBox, PixelIcon, PixelText, WOOD } from '../ui/pixel';

type Props = { username: string; points: string; profileImage: string };

const COIN = { O: WOOD.outline, G: WOOD.gold, H: '#fbf8d0', D: WOOD.goldDark };

export function ProfileBoard({ username, points, profileImage }: Props) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1 flex-row items-center gap-2">
        <View style={{ borderWidth: 3, borderColor: WOOD.outline }}>
          <Image source={{ uri: profileImage }} style={{ width: 30, height: 30 }} />
        </View>
        <PixelText variant="glyph20" bold numberOfLines={1} className="flex-shrink text-white">
          {username}
        </PixelText>
      </View>
      <PixelBox scale={3}>
        <View className="flex-row items-center gap-1">
          <PixelIcon rows={COIN_ROWS} palette={COIN} unit={2} />
          <PixelText variant="glyph14" bold style={{ color: WOOD.ink }}>{`${points} P`}</PixelText>
        </View>
      </PixelBox>
    </View>
  );
}
