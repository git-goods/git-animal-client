import { memo, useState } from 'react';
import { Alert, FlatList, Image, Pressable, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userQueries } from '@gitanimals/react-query';
import { dropPet, type Persona } from '@gitanimals/api';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { personaImageUrl } from '../../src/home/pickHomePets';
import { SellDialog } from '../../src/mypage/SellDialog';
import { cardTier, TIER_LABEL } from '../../src/shop/cardTier';
import { CanaryButton } from '../../src/ui/CanaryButton';
import { PixelSprite } from '../../src/ui/pixel';
import { fitScale } from '../../src/ui/pixel/scale';
import { sans } from '../../src/ui/sans';
import { TAB_BAR_HEIGHT } from '../../src/ui/TabBar';

const SELL_PRICE = 100;
const CELL = 52;
const GAP = 4;

// 피그마 banner-pet-select: 고르면 밝은 면 + 테두리
const PetCell = memo(function PetCell({ persona, selected, onPress }: { persona: Persona; selected: boolean; onPress: (id: string) => void }) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={persona.type}
      onPress={() => onPress(persona.id)}
      className="items-center justify-center overflow-hidden"
      style={{
        width: CELL,
        height: CELL,
        borderRadius: 8,
        backgroundColor: selected ? colors['white-alpha']['25'] : colors['white-alpha']['10'],
        borderWidth: selected ? 1 : 0,
        borderColor: colors['white-alpha']['50'],
      }}
    >
      <PixelSprite source={personaImageUrl(persona.type)} maxWidth={CELL} maxHeight={CELL} scale={fitScale} />
    </Pressable>
  );
});

// 피그마 943:37912 My page
export default function MyPage() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const user = useQuery(userQueries.userOptions());
  const username = user.data?.username ?? '';
  const personas = useQuery({ ...userQueries.allPersonasOptions(username), enabled: !!username });
  const list = personas.data?.personas ?? [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selling, setSelling] = useState(false);
  const current = list.find((p) => p.id === selectedId) ?? list[0];

  const sell = useMutation({
    mutationFn: (personaId: string) => dropPet({ personaId }),
    onSuccess: () => {
      setSelling(false);
      setSelectedId(null);
      void queryClient.invalidateQueries({ queryKey: userQueries.allKey() });
    },
    onError: () => {
      setSelling(false);
      Alert.alert(t('mypage.sellFail'));
    },
  });

  return (
    <View className="flex-1" style={{ backgroundColor: colors.gray['050'] }}>
      <View className="flex-row items-start" style={{ gap: 8, paddingHorizontal: 20, paddingTop: insets.top + 32, paddingBottom: 32 }}>
        <View className="flex-1 flex-row items-center" style={{ gap: 12 }}>
          {!!user.data && <Image source={{ uri: user.data.profileImage }} style={{ width: 48, height: 48, borderRadius: 24 }} />}
          <View className="flex-1" style={{ gap: 2 }}>
            <Text numberOfLines={1} style={[sans(24, 1.2, true), { color: colors.white }]}>{username}</Text>
            <View className="flex-row items-center" style={{ gap: 2.5 }}>
              <Image source={require('../../assets/home/coin.png')} style={{ width: 14, height: 14 }} />
              <Text style={[sans(14, 1.5), { color: colors.white }]}>{user.data?.points ?? '-'}</Text>
            </View>
          </View>
        </View>
        {/* ponytail: 설정 화면은 #445 에서 연결 */}
        <Image source={require('../../assets/ui/settings.png')} style={{ width: 24, height: 24 }} />
      </View>
      <FlatList
        data={list}
        keyExtractor={(p) => p.id}
        numColumns={6}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 16, gap: GAP }}
        ListHeaderComponent={
          <View style={{ gap: 28, marginBottom: 8 - GAP }}>
            {current && (
              <View className="items-center" style={{ gap: 16, paddingTop: 8, paddingBottom: 20, paddingHorizontal: 16, borderRadius: 10, backgroundColor: colors.gray['150'] }}>
                <View className="items-center">
                  <View className="items-center justify-center" style={{ width: 100, height: 100 }}>
                    <PixelSprite key={current.id} source={personaImageUrl(current.type)} maxWidth={100} maxHeight={100} scale={fitScale} />
                  </View>
                  <View className="flex-row items-center" style={{ gap: 12 }}>
                    <Text style={[sans(15, 1.5), { color: colors.white }]}>{current.type}</Text>
                    <Text style={[sans(14, 1.5), { color: colors['white-alpha']['50'] }]}>
                      {`${TIER_LABEL[cardTier(current.dropRate)]} / Lv.${current.level}`}
                    </Text>
                  </View>
                </View>
                <View className="flex-row" style={{ gap: 8 }}>
                  <CanaryButton tone="white" label={t('mypage.sell', { price: SELL_PRICE })} onPress={() => setSelling(true)} className="h-8 min-w-20 px-5" />
                  {/* ponytail: 레벨 합치기는 #446 에서 연결 */}
                  <CanaryButton tone="white" label={t('mypage.merge')} onPress={() => {}} disabled className="h-8 min-w-20 px-5" />
                </View>
              </View>
            )}
            <Text style={[sans(15, 1.5, true), { color: colors.white }]}>{t('mypage.petsList')}</Text>
          </View>
        }
        renderItem={({ item }) => <PetCell persona={item} selected={item.id === current?.id} onPress={setSelectedId} />}
      />
      <SellDialog
        visible={selling}
        price={SELL_PRICE}
        busy={sell.isPending}
        onCancel={() => setSelling(false)}
        onSell={() => current && sell.mutate(current.id)}
      />
    </View>
  );
}
