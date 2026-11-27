import { View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { renderStatsQueries } from '@gitanimals/react-query';
import { PixelText } from '../src/ui/pixel/PixelText';

export default function Index() {
  const { data } = useQuery(renderStatsQueries.allPersonaOptions());

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <PixelText variant="glyph32" title>깃애니멀즈 GitAnimals</PixelText>
      <PixelText variant="glyph18" bold>Galmuri11 굵게 가나다라</PixelText>
      <PixelText>Galmuri11 본문 가나다라마바사 0123</PixelText>
      <PixelText variant="glyph24">{data ? data.personas.length : '...'}</PixelText>
    </View>
  );
}
