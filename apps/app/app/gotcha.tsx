import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { Alert, Pressable, Text, View, type ViewProps } from 'react-native';
import Animated, { FlipInEasyY } from 'react-native-reanimated';
import type { GotchaResult } from '@gitanimals/api';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardBack, GameCard } from '../src/shop/GameCard';
import { useGotcha } from '../src/shop/useGotcha';
import { sans } from '../src/ui/sans';

// reanimated 4.7 타입이 RN 0.88 View 의 children 을 잃는다 (src/home/WanderingPet.tsx 와 같은 우회)
const AnimatedView = Animated.View as unknown as ComponentType<ViewProps & { entering?: unknown }>;

// 피그마 카드 사이 간격
const GAP = 8;
const ONE_PET_ROWS = [3, 2];
const TEN_PET_ROWS = [2, 3, 3, 2];

// 피그마 943:39425 (1 pet), 943:39436 (10 pets)
export default function Gotcha() {
  const { count: rawCount } = useLocalSearchParams<{ count?: string }>();
  const count = rawCount === '10' ? 10 : 1;
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { results, failed } = useGotcha(count);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    if (!failed) return;
    Alert.alert(t('gotcha.get-persona-fail'), t('gotcha.many-error-message'), [
      { text: t('common.confirm'), onPress: () => router.back() },
    ]);
  }, [failed, router, t]);

  const one = count === 1;
  const done = !!results && (!one || picked !== null);
  const front = (result: GotchaResult) => (
    <AnimatedView entering={FlipInEasyY.duration(400)}>
      <GameCard type={result.name} dropRate={result.dropRate} />
    </AnimatedView>
  );

  return (
    <Pressable
      accessible={false}
      disabled={!done}
      onPress={() => router.back()}
      className={`flex-1 items-center bg-gray-050 ${one ? 'justify-center' : ''}`}
      style={{ paddingTop: insets.top + (one ? 0 : 48), paddingBottom: insets.bottom, paddingHorizontal: 16, gap: 40 }}
    >
      <Text style={[sans(28, 1.2, true), { color: colors.white.DEFAULT, textAlign: 'center' }]}>
        {one ? t('gotcha.one-title') : t('gotcha.ten-title')}
      </Text>

      {one ? (
        <CardRows
          rows={ONE_PET_ROWS}
          render={(i) =>
            picked === i && results ? (
              front(results[0])
            ) : (
              <Pressable
                accessibilityRole="button"
                disabled={picked !== null}
                onPress={() => setPicked(i)}
                style={{ opacity: picked !== null && picked !== i ? 0.4 : 1 }}
              >
                <CardBack />
              </Pressable>
            )
          }
        />
      ) : (
        <CardRows rows={TEN_PET_ROWS} render={(i) => (results?.[i] ? front(results[i]) : <CardBack />)} />
      )}

      {/* 피그마에는 없다. 결과를 본 뒤 닫는 방법을 알려 준다 */}
      {done && (
        <Text
          className="absolute"
          style={[sans(14, 1.5), { color: colors.white['50'], bottom: insets.bottom + 16 }]}
        >
          {t('gotcha.click-to-close')}
        </Text>
      )}
    </Pressable>
  );
}

function CardRows({ rows, render }: { rows: number[]; render: (index: number) => ReactNode }) {
  let index = 0;
  return (
    <View style={{ gap: GAP }}>
      {rows.map((size, row) => (
        <View key={row} className="flex-row justify-center" style={{ gap: GAP }}>
          {Array.from({ length: size }, () => {
            const i = index++;
            return <View key={i}>{render(i)}</View>;
          })}
        </View>
      ))}
    </View>
  );
}
