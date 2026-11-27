import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getAllPersona } from '@gitanimals/api';

export default function Index() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    getAllPersona().then((res) => setCount(res.personas.length));
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">{count ?? '...'}</Text>
    </View>
  );
}
