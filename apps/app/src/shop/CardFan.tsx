import { useEffect, type ComponentType } from 'react';
import { View, type ViewProps } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { CARD_H, CARD_W, GameCard } from './GameCard';

// reanimated 4.7 타입이 RN 0.88 View 의 children·style 을 잃는다 (src/home/WanderingPet.tsx 와 같은 우회)
const AnimatedView = Animated.View as unknown as ComponentType<Omit<ViewProps, 'style'> & { style?: unknown }>;

// 피그마 image-card(943:39233) 자리 240×114. 그림은 웹 pet-gotcha-image-card 의 카드 배치를 따랐다
const BOX = { w: 240, h: 114 };

// 뒤에 깔리는 카드부터. dx·dy·rotate 는 다 펼쳤을 때 값이다
const CARDS = [
  { type: 'LITTLE_CHICK', rate: '10%', dx: -86, dy: 8, rotate: -16, scale: 0.66 },
  { type: 'QUOKKA', rate: '0.1%', dx: 86, dy: 8, rotate: 14, scale: 0.66 },
  { type: 'WHITE_CAT', rate: '0%', dx: -52, dy: 2, rotate: -8, scale: 0.7 },
  { type: 'LITTLE_CHICK_NODE', rate: '10%', dx: 52, dy: 2, rotate: 8, scale: 0.7 },
  { type: 'DESSERT_FOX', rate: '0.01%', dx: 0, dy: 0, rotate: 0, scale: 0.76 },
] as const;

// 처음 보일 때 가운데에서 부채꼴로 펼치고, 가운데 카드는 천천히 떠다닌다
export function CardFan() {
  const open = useSharedValue(0);
  const float = useSharedValue(0);

  useEffect(() => {
    open.value = withDelay(150, withSpring(1, { damping: 12, stiffness: 120 }));
    float.value = withDelay(
      700,
      withRepeat(
        withSequence(
          withTiming(-4, { duration: 1200, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
      ),
    );
  }, [open, float]);

  return (
    <View style={{ width: BOX.w, height: BOX.h }}>
      {CARDS.map((card) => (
        <FanCard key={card.type} card={card} open={open} float={card.dx === 0 ? float : undefined} />
      ))}
    </View>
  );
}

function FanCard({
  card,
  open,
  float,
}: {
  card: (typeof CARDS)[number];
  open: SharedValue<number>;
  float?: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: card.dx * open.value },
      { translateY: card.dy * open.value + (float?.value ?? 0) },
      { rotate: `${card.rotate * open.value}deg` },
      { scale: card.scale },
    ],
  }));

  return (
    <AnimatedView
      style={[{ position: 'absolute', left: (BOX.w - CARD_W) / 2, top: (BOX.h - CARD_H) / 2 }, style]}
    >
      <GameCard type={card.type} dropRate={card.rate} />
    </AnimatedView>
  );
}
