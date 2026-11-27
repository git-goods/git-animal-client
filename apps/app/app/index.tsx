import { Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { renderStatsQueries } from '@gitanimals/react-query';

export default function Index() {
  const { data } = useQuery(renderStatsQueries.allPersonaOptions());

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">{data ? data.personas.length : '...'}</Text>
    </View>
  );
}
