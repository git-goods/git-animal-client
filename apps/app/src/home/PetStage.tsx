import { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Persona } from '@gitanimals/api';
import { PixelText } from '../ui/pixel';
import { WanderingPet, PET_SIZE } from './WanderingPet';

export function PetStage({ personas }: { personas: Persona[] }) {
  const { t } = useTranslation();
  const [width, setWidth] = useState(0);
  const [failed, setFailed] = useState<ReadonlySet<string>>(new Set());
  const pets = personas.filter((p) => !failed.has(p.type));

  if (pets.length === 0) {
    return (
      <View className="items-center justify-center" style={{ height: PET_SIZE }}>
        <PixelText variant="glyph14" className="text-white">
          {t('home.no_visible_pets')}
        </PixelText>
      </View>
    );
  }

  return (
    <View
      className="w-full overflow-hidden"
      style={{ height: PET_SIZE + 6 }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {pets.map((p) => (
        <WanderingPet
          key={p.id}
          persona={p}
          stageWidth={width}
          onError={() => setFailed((prev) => new Set(prev).add(p.type))}
        />
      ))}
    </View>
  );
}
