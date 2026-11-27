import { Image, ScrollView, Text, View, type ImageSourcePropType } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShopBackground } from '../../src/shop/ShopArt';
import { sans } from '../../src/ui/sans';
import { TAB_BAR_HEIGHT } from '../../src/ui/TabBar';

// 피그마 943:29011 Game. 하늘·도시 배경은 상점과 같다
export default function Game() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const fill = (text: string, point: number) => text.replace('[point]', String(point));

  return (
    <View className="flex-1">
      <ShopBackground />
      <ScrollView
        contentContainerStyle={{
          gap: 48,
          paddingHorizontal: 16,
          paddingTop: insets.top + 40,
          paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 40,
        }}
      >
        <View style={{ gap: 8 }}>
          <Text style={[sans(40, 1.2, true), { color: colors.white, textAlign: 'center' }]}>{t('tabs.game')}</Text>
          <Text style={[sans(18, 1.5), { color: colors['white-alpha']['90'], textAlign: 'center' }]}>
            {t('game.description')}
          </Text>
        </View>

        {/* ponytail: 카드는 아직 누를 곳이 없다. 퀴즈 만들기·풀기 화면이 붙을 때 onPress 를 단다 */}
        <View style={{ gap: 8 }}>
          <GameCard
            icon={require('../../assets/game/create-quiz.png')}
            title={t('quiz.create-quiz-card-title')}
            description={fill(t('quiz.create-quiz-card-description'), 5000)}
            badge="5000P"
          />
          <GameCard
            icon={require('../../assets/game/solve-quiz.png')}
            title={t('quiz.solve-quiz-card-title.not-started')}
            description={fill(t('quiz.solve-quiz-card-description.not-started'), 32000)}
            badge={fill(t('quiz.solve-quiz-card-point.not-started'), 32000)}
          />
          <GameCard
            icon={require('../../assets/game/matching-card.png')}
            title={t('game.matching-card-title')}
            description={t('game.matching-card-description')}
            badge="1000P"
          />
        </View>
      </ScrollView>
    </View>
  );
}

function GameCard({ icon, title, description, badge }: { icon: ImageSourcePropType; title: string; description: string; badge: string }) {
  return (
    <View
      className="flex-row items-center"
      style={{ gap: 12, paddingHorizontal: 24, paddingVertical: 20, borderRadius: 10, backgroundColor: colors['white-alpha']['25'] }}
    >
      <Image source={icon} style={{ width: 80, height: 80 }} />
      <View className="flex-1" style={{ gap: 4 }}>
        <Text style={[sans(18, 1.2, true), { color: colors.white }]}>{title}</Text>
        <Text style={[sans(14, 1.5), { color: colors['white-alpha']['50'] }]}>{description}</Text>
      </View>
      <View
        className="absolute"
        style={{ top: 8, right: 8, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: colors['black-alpha']['25'] }}
      >
        {/* 피그마 943:29796 brand-color-glacier. ui-tailwind 토큰에 없다 */}
        <Text style={[sans(10, 1.5), { color: '#96c0d6' }]}>{badge}</Text>
      </View>
    </View>
  );
}
