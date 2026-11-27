import { Image, Pressable, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { sans } from './sans';

// 피그마 appbar-top: 44 높이, 왼쪽 뒤로가기, 가운데 제목
export function AppBar({ title }: { title: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <View style={{ height: 44, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable accessibilityRole="button" accessibilityLabel={t('common.back')} onPress={() => router.back()} style={{ position: 'absolute', left: 16 }} hitSlop={10}>
        <Image source={require('../../assets/ui/chevron-left.png')} style={{ width: 24, height: 24 }} />
      </Pressable>
      <Text style={[sans(18, 1.2, true), { color: colors.white }]}>{title}</Text>
    </View>
  );
}
