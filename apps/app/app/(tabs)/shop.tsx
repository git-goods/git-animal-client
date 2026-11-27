import { Image, ScrollView, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { userQueries } from '@gitanimals/react-query';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuctionCat, ShopBackground } from '../../src/shop/ShopArt';
import { sans } from '../../src/ui/sans';
import { TAB_BAR_HEIGHT } from '../../src/ui/TabBar';

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
              {/* 피그마 943:39180 coin: 16 칸을 코인이 꽉 채운다. webp 는 둘레가 투명 여백이라 키워서 자른다 */}
              <View style={{ width: 16, height: 16, overflow: 'hidden' }}>
                <Image
                  source={require('../../assets/shop/coin.webp')}
                  style={{ position: 'absolute', left: -2, top: -2, width: 20, height: 20 }}
                />
              </View>
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
              <CanaryButton label={t('gotcha.draw-one')} />
              <CanaryButton label={t('gotcha.draw-ten')} />
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

// ponytail: 뽑기 결과 화면(943:39425, 943:39436)을 만들 때 Pressable 로 바꾸고 onPress 를 단다
function CanaryButton({ label }: { label: string }) {
  return (
    <View
      className="items-center justify-center"
      style={{
        height: 32,
        minWidth: 80,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: colors.black.DEFAULT,
        borderRadius: 6,
        backgroundColor: colors.brand.canary,
        // 피그마 button: 아래 그림자 + 위 밝은 줄·아래 어두운 줄
        boxShadow: '0px 4px 2px rgba(0, 0, 0, 0.25), inset 0px -3px 0px #c4c382, inset 0px 3px 0px #fdfed2',
      }}
    >
      <Text style={[sans(14, 1.5), { color: colors.black.DEFAULT }]}>{label}</Text>
    </View>
  );
}
