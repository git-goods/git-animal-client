import { View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { renderStatsQueries } from '@gitanimals/react-query';
import { useTranslation } from 'react-i18next';
import { PixelPanel, PixelText } from '../../src/ui/pixel';

// Task 7 에서 실제 홈으로 교체한다
export default function Home() {
  const { t } = useTranslation();
  const { data } = useQuery(renderStatsQueries.allPersonaOptions());

  return (
    <View className="flex-1 items-center justify-center bg-gray-000">
      <PixelPanel source={require('../../assets/ui/panel.png')} className="items-center gap-2 px-8 py-6">
        <PixelText variant="glyph18" bold>{t('tabs.home')}</PixelText>
        <PixelText variant="glyph14">{data ? data.personas.length : t('common.comingSoon')}</PixelText>
      </PixelPanel>
    </View>
  );
}
