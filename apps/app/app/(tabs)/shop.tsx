import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { userQueries } from '@gitanimals/react-query';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GOTCHA_PRICE } from '../../src/shop/useGotcha';
import { CardFan } from '../../src/shop/CardFan';
import { AuctionCat, ShopBackground } from '../../src/shop/ShopArt';
import { CanaryButton } from '../../src/ui/CanaryButton';
import { sans } from '../../src/ui/sans';
import { TAB_BAR_HEIGHT } from '../../src/ui/TabBar';

const CARD = { backgroundColor: colors['white-alpha']['25'], borderRadius: 10 } as const;

// 피그마 943:38402 Shop
export default function Shop() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const user = useQuery(userQueries.userOptions());
  const router = useRouter();

  const draw = (count: 1 | 10) => {
    if (!user.data) return;
    if (Number(user.data.points) < GOTCHA_PRICE * count) {
      Alert.alert(t('gotcha.not-enough-points'));
      return;
    }
    router.push({ pathname: '/gotcha', params: { count } });
  };

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
        <Text style={[sans(40, 1.2, true), { color: colors.white, textAlign: 'center' }]}>{t('tabs.shop')}</Text>

        <View className="w-full" style={{ gap: 8 }}>
          <View className="flex-row items-end justify-between">
            <View className="flex-row items-center" style={{ gap: 4, minHeight: 32, paddingLeft: 8, paddingRight: 10 }}>
              <Image source={require('../../assets/home/coin.png')} style={{ width: 16, height: 16 }} />
              <Text style={[sans(15, 1.5, true), { color: colors.white }]}>
                {user.data ? `${user.data.points} P` : '-'}
              </Text>
            </View>
            <View style={{ backgroundColor: colors['white-alpha']['5'], borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 }}>
              <Text style={[sans(12, 1.5), { color: colors['white-alpha']['50'] }]}>{t('shop.drop-rate')}</Text>
            </View>
          </View>

          <View className="items-center" style={[CARD, { gap: 24, padding: 24 }]}>
            <View className="w-full" style={{ gap: 4, paddingTop: 16 }}>
              <Text style={[sans(18, 1.2, true), { color: colors.white, textAlign: 'center' }]}>
                {t('gotcha.pet-gotcha-title')}
              </Text>
              <Text style={[sans(14, 1.5), { color: colors['white-alpha']['50'], textAlign: 'center' }]}>
                {t('gotcha.pet-gotcha-desc')}
              </Text>
            </View>
            <CardFan />
            <View className="flex-row flex-wrap justify-center" style={{ gap: 8 }}>
              <CanaryButton label={t('gotcha.draw-one')} onPress={() => draw(1)} className="h-8 min-w-20 px-5" />
              <CanaryButton label={t('gotcha.draw-ten')} onPress={() => draw(10)} className="h-8 min-w-20 px-5" />
            </View>
          </View>

          <View className="flex-row items-center" style={[CARD, { gap: 12, paddingHorizontal: 24, paddingVertical: 20 }]}>
            <AuctionCat />
            <View className="flex-1" style={{ gap: 4 }}>
              <Text style={[sans(18, 1.2, true), { color: colors.white }]}>{t('shop.auction')}</Text>
              <Text style={[sans(14, 1.5), { color: colors['white-alpha']['50'] }]}>{t('shop.auction-desc')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
