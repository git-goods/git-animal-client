import { ScrollView, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TERMS } from '../src/settings/terms';
import { AppBar } from '../src/ui/AppBar';
import { sans } from '../src/ui/sans';

// 피그마 943:38241 Terms of Service
export default function Terms() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1" style={{ backgroundColor: colors.gray['050'], paddingTop: insets.top }}>
      <AppBar title={t('settings.terms')} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 16 }}>
        <Text style={[sans(16, 1.5), { color: colors['white-alpha']['75'] }]}>{TERMS}</Text>
      </ScrollView>
    </View>
  );
}
