import { useState } from 'react';
import { Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useTranslation } from 'react-i18next';
import { sans } from '../ui/sans';

// 피그마 943:18190 의 linear-gradient(167.6deg, ...) 를 CSS 와 같은 규칙으로 시작·끝점으로 바꾼다
const ANGLE = (167.62 * Math.PI) / 180;
const STOPS = ['rgba(253, 251, 209, 0.4)', 'rgba(0, 157, 129, 0.4)', 'rgba(61, 139, 255, 0.4)'];
const POSITIONS = [0.0219, 0.4924, 0.9821];

function gradientEnds(w: number, h: number) {
  const dx = Math.sin(ANGLE);
  const dy = -Math.cos(ANGLE);
  const half = (Math.abs(w * dx) + Math.abs(h * dy)) / 2;
  return { start: vec(w / 2 - dx * half, h / 2 - dy * half), end: vec(w / 2 + dx * half, h / 2 + dy * half) };
}

function Score({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 items-center">
      <Text style={[sans(13, 1.4), { color: colors['white-alpha']['50'], textAlign: 'center' }]}>{label}</Text>
      <Text style={[sans(18, 1.5), { color: colors.white, textAlign: 'center' }]}>{value}</Text>
    </View>
  );
}

// ponytail: 방문자·다음 펫까지는 render 서버가 더 이상 주지 않아(GET /users 없음) 기여·펫 수만 보인다
export function ScoreBoard({ contribution, petCount }: { contribution: string; petCount: number }) {
  const { t } = useTranslation();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const ends = gradientEnds(size.w, size.h);

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View
        style={{ borderRadius: 10, overflow: 'hidden' }}
        onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
      >
        <BlurView intensity={20} tint="default" className="absolute inset-0" />
        <Canvas style={{ position: 'absolute', width: size.w, height: size.h }}>
          <Rect x={0} y={0} width={size.w} height={size.h}>
            <LinearGradient start={ends.start} end={ends.end} colors={STOPS} positions={POSITIONS} />
          </Rect>
        </Canvas>
        <View className="flex-row" style={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
          <Score label={t('home.contribution')} value={contribution} />
          <Score label={t('home.pet_count')} value={String(petCount)} />
        </View>
      </View>
    </View>
  );
}
