import { Image, View } from 'react-native';
import { PixelBox, PixelText } from '../ui/pixel';

type Props = { username: string; points: string; profileImage: string };

export function ProfileBoard({ username, points, profileImage }: Props) {
  return (
    <PixelBox className="self-stretch">
      <View className="flex-row items-center gap-3">
        <Image source={{ uri: profileImage }} style={{ width: 48, height: 48 }} />
        <View className="gap-1">
          <PixelText variant="glyph16" bold>{username}</PixelText>
          <PixelText variant="glyph14">{`${points} P`}</PixelText>
        </View>
      </View>
    </PixelBox>
  );
}
