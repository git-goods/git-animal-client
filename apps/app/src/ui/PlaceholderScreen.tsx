import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PixelPanel, PixelText } from './pixel';

export function PlaceholderScreen({ titleKey, bodyKey }: { titleKey: string; bodyKey: string }) {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center bg-gray-000">
      <PixelPanel source={require('../../assets/ui/panel.png')} className="items-center gap-2 px-8 py-6">
        <PixelText variant="glyph18" bold>{t(titleKey)}</PixelText>
        <PixelText variant="glyph14">{t(bodyKey)}</PixelText>
      </PixelPanel>
    </View>
  );
}
