import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { Button } from '../ui/Button';
import { sans } from '../ui/sans';

export function RetryNotice({ onRetry }: { onRetry: () => void }) {
  const { t } = useTranslation();

  return (
    <View className="items-center gap-3">
      <Text style={[sans(15, 1.5), { color: colors.white }]}>{t('common.load_failed')}</Text>
      <Button label={t('common.retry')} onPress={onRetry} />
    </View>
  );
}
