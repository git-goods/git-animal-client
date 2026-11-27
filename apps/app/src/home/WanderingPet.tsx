import { useEffect, useRef, useState, type ComponentType } from 'react';
import { Pressable, type ViewProps } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import type { Persona } from '@gitanimals/api';
import { PixelSprite } from '../ui/pixel';
import { personaImageUrl } from './pickHomePets';
import { PetBubble } from './PetBubble';

// reanimated 4.7 타입이 RN 0.88 View 의 children·style 을 잃어서 좁혀서 다시 선언한다
export const AnimatedView = Animated.View as unknown as ComponentType<
  Omit<ViewProps, 'style'> & { className?: string; style?: unknown }
>;

// 펫 PNG 원본(140×140) 1배. 그림 둘레 여백이 커서 이보다 작으면 펫이 너무 작아 보인다
export const PET_SIZE = 140;
export const GRID = 3;
const BUBBLE_MS = 2500;

export type Field = { minX: number; maxX: number; minY: number; maxY: number };

const snap = (v: number) => {
  'worklet';
  return Math.round(v / GRID) * GRID;
};
const between = (min: number, max: number) => min + Math.random() * (max - min);

type Props = {
  persona: Persona;
  field: Field | null;
  onError: () => void;
};

export function WanderingPet({ persona, field, onError }: Props) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const bounce = useSharedValue(0);
  const facing = useSharedValue(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [bubble, setBubble] = useState<string | null>(null);

  const { minX = 0, maxX = 0, minY = 0, maxY = 0 } = field ?? {};

  useEffect(() => {
    if (!field) return;
    x.value = snap(between(minX, maxX));
    y.value = snap(between(minY, maxY));
    if (reducedMotion) return;
    let active = true;

    const rest = () => {
      bounce.value = 0;
      timer.current = setTimeout(walk, between(2500, 6000));
    };
    const walk = () => {
      if (!active) return;
      const tx = snap(between(minX, maxX));
      const ty = snap(between(minY, maxY));
      const distance = Math.hypot(tx - x.value, ty - y.value);
      if (distance < GRID) return rest();
      const duration = distance * 70;
      facing.value = tx >= x.value ? 1 : -1;
      x.value = withTiming(tx, { duration, easing: Easing.linear });
      y.value = withTiming(ty, { duration, easing: Easing.linear });
      bounce.value = withRepeat(
        withSequence(withTiming(-GRID, { duration: 250 }), withTiming(0, { duration: 250 })),
        -1,
      );
      timer.current = setTimeout(() => {
        cancelAnimation(bounce);
        rest();
      }, duration);
    };
    walk();

    return () => {
      active = false;
      if (timer.current) clearTimeout(timer.current);
      cancelAnimation(x);
      cancelAnimation(y);
      cancelAnimation(bounce);
    };
  }, [field, reducedMotion, minX, maxX, minY, maxY, x, y, bounce, facing]);

  useEffect(() => {
    if (!bubble) return;
    const id = setTimeout(() => setBubble(null), BUBBLE_MS);
    return () => clearTimeout(id);
  }, [bubble]);

  const greet = () => {
    const greetings = t('home.greetings', { returnObjects: true }) as string[];
    setBubble(greetings[Math.floor(Math.random() * greetings.length)] ?? '');
  };

  // 아래에 있는 펫이 앞에 오도록 y 를 zIndex 로 쓴다
  const position = useAnimatedStyle(() => ({
    zIndex: Math.round(y.value),
    transform: [{ translateX: snap(x.value) }, { translateY: snap(y.value + bounce.value) }],
  }));
  const flip = useAnimatedStyle(() => ({ transform: [{ scaleX: facing.value }] }));

  return (
    <AnimatedView
      testID={`wandering-pet-${persona.id}`}
      className="absolute left-0 top-0"
      style={[{ width: PET_SIZE, height: PET_SIZE }, position]}
    >
      <Pressable accessibilityRole="button" accessibilityLabel={persona.type} onPress={greet}>
        <AnimatedView style={flip}>
          <PixelSprite source={personaImageUrl(persona.type)} maxWidth={PET_SIZE} maxHeight={PET_SIZE} onError={onError} />
        </AnimatedView>
      </Pressable>
      {bubble && <PetBubble text={bubble} petSize={PET_SIZE} />}
    </AnimatedView>
  );
}
