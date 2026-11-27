import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { sans } from './sans';

const SHOW_MS = 3000;

// 피그마 snackbar(943:30637): 흐린 흰 면 위 짧은 안내. 새 message 를 3초 보여 준다
export function Snackbar({ message, bottom }: { message?: string; bottom: number }) {
  // ponytail: 같은 문구가 연달아 오면 두 번째는 안 보인다. 그럴 일이 생기면 id 를 같이 받는다
  const [hidden, setHidden] = useState<string>();

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setHidden(message), SHOW_MS);
    return () => clearTimeout(timer);
  }, [message]);

  const shown = message && message !== hidden ? message : undefined;
  if (!shown) return null;
  return (
    <View pointerEvents="none" className="absolute inset-x-0 items-center" style={{ bottom }}>
      <View
        accessibilityRole="alert"
        style={{
          borderRadius: 6,
          overflow: 'hidden',
          paddingHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: colors['white-alpha']['75'],
          boxShadow: 'inset 0px 5px 50px 4px rgba(78, 90, 122, 0.3)',
        }}
      >
        <BlurView intensity={20} className="absolute inset-0" />
        <Text style={[sans(14, 1.5), { color: colors.gray['050'] }]}>{shown}</Text>
      </View>
    </View>
  );
}
