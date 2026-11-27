import { useEffect, useRef, type ComponentType } from 'react';
import type { ViewProps } from 'react-native';
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
import type { Persona } from '@gitanimals/api';
import { PixelSprite } from '../ui/pixel';
import { personaImageUrl } from './pickHomePets';

// reanimated 4.7 타입이 RN 0.88 View 의 children·style 을 잃어서 좁혀서 다시 선언한다
const AnimatedView = Animated.View as unknown as ComponentType<
  Omit<ViewProps, 'style'> & { className?: string; style?: unknown }
>;

export const PET_SIZE = 140;
const GRID = 3;

const snap = (v: number) => {
  'worklet';
  return Math.round(v / GRID) * GRID;
};
const between = (min: number, max: number) => min + Math.random() * (max - min);

type Props = {
  persona: Persona;
  stageWidth: number;
  onError: () => void;
};

export function WanderingPet({ persona, stageWidth, onError }: Props) {
  const reducedMotion = useReducedMotion();
  const maxX = Math.max(0, stageWidth - PET_SIZE);
  const x = useSharedValue(snap(between(0, maxX)));
  const bounce = useSharedValue(0);
  const facing = useSharedValue(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reducedMotion || maxX === 0) return;
    let active = true;
    x.value = snap(between(0, maxX));

    const rest = () => {
      bounce.value = 0;
      timer.current = setTimeout(walk, between(1000, 2000));
    };
    const walk = () => {
      if (!active) return;
      const target = snap(between(0, maxX));
      const duration = between(2000, 4000);
      if (target === x.value) return rest();
      facing.value = target > x.value ? 1 : -1;
      x.value = withTiming(target, { duration, easing: Easing.linear });
      bounce.value = withRepeat(
        withSequence(withTiming(-GRID, { duration: 150 }), withTiming(0, { duration: 150 })),
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
      cancelAnimation(bounce);
    };
  }, [reducedMotion, maxX, x, bounce, facing]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: snap(x.value) },
      { translateY: snap(bounce.value) },
      { scaleX: facing.value },
    ],
  }));

  return (
    <AnimatedView
      testID={`wandering-pet-${persona.id}`}
      className="absolute bottom-0 left-0"
      style={[{ width: PET_SIZE, height: PET_SIZE }, style]}
    >
      <PixelSprite
        source={personaImageUrl(persona.type)}
        maxWidth={PET_SIZE}
        maxHeight={PET_SIZE}
        onError={onError}
      />
    </AnimatedView>
  );
}
