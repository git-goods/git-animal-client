import { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Persona } from '@gitanimals/api';
import { PixelText } from '../ui/pixel';
import { RetryNotice } from './RetryNotice';
import { WanderingPet, PET_SIZE, type Field } from './WanderingPet';

type Props = {
  personas: Persona[];
  // 무대 높이 대비 펫이 걸을 수 있는 영역(발 위치 기준)
  fieldTop: number;
  fieldBottom: number;
};

export function PetStage({ personas, fieldTop, fieldBottom }: Props) {
  const { t } = useTranslation();
  const [field, setField] = useState<Field | null>(null);
  const [failed, setFailed] = useState<ReadonlySet<string>>(new Set());
  // 보여 줄 펫이 바뀌면 실패 목록을 비워 이미지를 다시 받는다
  const [seen, setSeen] = useState(personas);
  if (seen !== personas) {
    setSeen(personas);
    setFailed(new Set());
  }
  const pets = personas.filter((p) => !failed.has(p.type));
  const allFailed = personas.length > 0 && pets.length === 0;

  return (
    <View
      className="absolute inset-0"
      pointerEvents="box-none"
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        const next = {
          minX: 0,
          maxX: Math.max(0, width - PET_SIZE),
          minY: height * fieldTop,
          maxY: Math.max(height * fieldTop, height * fieldBottom - PET_SIZE),
        };
        // 크기가 그대로면 같은 객체를 둬서 펫 애니메이션이 처음부터 다시 시작되지 않게 한다
        setField((prev) => (prev && prev.maxX === next.maxX && prev.minY === next.minY && prev.maxY === next.maxY ? prev : next));
      }}
    >
      {pets.length === 0 ? (
        <View className="absolute inset-x-0 items-center" style={{ top: `${fieldTop * 100 + 10}%` }}>
          {allFailed ? (
            <RetryNotice onRetry={() => setFailed(new Set())} />
          ) : (
            <PixelText variant="glyph14" className="text-white">
              {t('home.no_visible_pets')}
            </PixelText>
          )}
        </View>
      ) : (
        pets.map((p) => (
          <WanderingPet
            key={p.id}
            persona={p}
            field={field}
            onError={() => setFailed((prev) => new Set(prev).add(p.type))}
          />
        ))
      )}
    </View>
  );
}
