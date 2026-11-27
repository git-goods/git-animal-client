import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PixelButton, PixelText } from '../ui/pixel';

export function RetryNotice({ onRetry }: { onRetry: () => void }) {
  const { t } = useTranslation();

  return (
    <View className="items-center gap-3">
      <PixelText variant="glyph14" className="text-white">{t('common.load_failed')}</PixelText>
      <PixelButton label={t('common.retry')} onPress={onRetry} />
    </View>
  );
}
