import { Image, ScrollView, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { userQueries } from '@gitanimals/react-query';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuctionCat, ShopBackground } from '../../src/shop/ShopArt';
import { CanaryButton } from '../../src/ui/CanaryButton';
import { sans } from '../../src/ui/sans';
import { TAB_BAR_HEIGHT } from '../../src/ui/TabBar';

// 피그마 943:38402 뽑기 버튼은 primary-S 의 32 높이
const DRAW = { height: 32, minWidth: 80, paddingHorizontal: 20 } as const;
const CARD = { backgroundColor: colors.white['25'], borderRadius: 10 } as const;

// 피그마 943:38402 Shop
export default function Shop() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const user = useQuery(userQueries.userOptions());

  return (
    <View className="flex-1">
      <ShopBackground />
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          gap: 24,
          paddingHorizontal: 16,
          paddingTop: insets.top + 40,
          paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 40,
        }}
      >
        <Text style={[sans(40, 1.2, true), { color: colors.white.DEFAULT, textAlign: 'center' }]}>{t('tabs.shop')}</Text>

        <View className="w-full" style={{ gap: 8 }}>
          <View className="flex-row items-end justify-between">
            <View className="flex-row items-center" style={{ gap: 4, minHeight: 32, paddingLeft: 8, paddingRight: 10 }}>
              <Image source={require('../../assets/home/coin.png')} style={{ width: 16, height: 16 }} />
              <Text style={[sans(15, 1.5, true), { color: colors.white.DEFAULT }]}>
                {user.data ? `${user.data.points} P` : '-'}
              </Text>
            </View>
            <View style={{ backgroundColor: colors.white['5'], borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 }}>
              <Text style={[sans(12, 1.5), { color: colors.white['50'] }]}>{t('shop.drop-rate')}</Text>
            </View>
          </View>

          <View className="items-center" style={[CARD, { gap: 24, padding: 24 }]}>
            <View className="w-full" style={{ gap: 4, paddingTop: 16 }}>
              <Text style={[sans(18, 1.2, true), { color: colors.white.DEFAULT, textAlign: 'center' }]}>
                {t('gotcha.pet-gotcha-title')}
              </Text>
              <Text style={[sans(14, 1.5), { color: colors.white['50'], textAlign: 'center' }]}>
                {t('gotcha.pet-gotcha-desc')}
              </Text>
            </View>
            <Image source={require('../../assets/shop/pet-gotcha-image-card.webp')} style={{ width: 240, height: 113.9 }} />
            <View className="flex-row flex-wrap justify-center" style={{ gap: 8 }}>
              <CanaryButton label={t('gotcha.draw-one')} style={DRAW} />
              <CanaryButton label={t('gotcha.draw-ten')} style={DRAW} />
            </View>
          </View>

          <View className="flex-row items-center" style={[CARD, { gap: 12, paddingHorizontal: 24, paddingVertical: 20 }]}>
            <AuctionCat />
            <View className="flex-1" style={{ gap: 4 }}>
              <Text style={[sans(18, 1.2, true), { color: colors.white.DEFAULT }]}>{t('shop.auction')}</Text>
              <Text style={[sans(14, 1.5), { color: colors.white['50'] }]}>{t('shop.auction-desc')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
