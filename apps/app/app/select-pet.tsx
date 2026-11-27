import { memo, useCallback, useMemo, useState } from 'react';
import { useWindowDimensions, FlatList, Image, Pressable, Text, View } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userQueries } from '@gitanimals/react-query';
import type { Persona } from '@gitanimals/api';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { homePetsKey, homePetsOptions, saveHomePets } from '../src/home/homePetSelection';
import { PetStage } from '../src/home/PetStage';
import { PET_SIZE } from '../src/home/WanderingPet';
import { HOME_PET_MAX, personaImageUrl, pickHomePets } from '../src/home/pickHomePets';
import { toggleSelection } from '../src/home/toggleSelection';
import { PixelSprite } from '../src/ui/pixel';
import { CanaryButton } from '../src/ui/CanaryButton';
import { sans } from '../src/ui/sans';

const PREVIEW_HEIGHT = 220;
const GAP = 4;
const BG = colors.gray['050'];

// 피그마 banner-pet-select: 고르면 밝은 면 + 테두리, 아니면 어두운 면. 펫 PNG 를 1배로 가운데 두고 잘라 낸다
const PetCell = memo(function PetCell({
  persona,
  selected,
  size,
  onToggle,
}: {
  persona: Persona;
  selected: boolean;
  size: number;
  onToggle: (id: string) => void;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={persona.type}
      onPress={() => onToggle(persona.id)}
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: selected ? colors.white['25'] : colors.white['10'],
        borderWidth: selected ? 1.5 : 0,
        borderColor: colors.white['50'],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ position: 'absolute', left: (size - PET_SIZE) / 2, top: (size - PET_SIZE) / 2 }}>
        <PixelSprite source={personaImageUrl(persona.type)} maxWidth={PET_SIZE} maxHeight={PET_SIZE} />
      </View>
      <View style={{ position: 'absolute', right: 2, top: 57, backgroundColor: colors.black['25'], borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 }}>
        <Text style={[sans(10, 1.5), { color: colors.white['75'] }]}>{`Lv.${persona.level}`}</Text>
      </View>
    </Pressable>
  );
});

// 피그마 bottom 의 dim: 위는 투명, 절반부터 배경색
function Dim({ width }: { width: number }) {
  return (
    <Canvas pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 160 }}>
      <Rect x={0} y={0} width={width} height={160}>
        <LinearGradient start={vec(0, 0)} end={vec(0, 160)} colors={['rgba(24, 26, 29, 0)', BG, BG]} positions={[0, 0.5, 1]} />
      </Rect>
    </Canvas>
  );
}

export default function SelectPet() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const user = useQuery(userQueries.userOptions());
  const username = user.data?.username ?? '';
  const personas = useQuery({ ...userQueries.allPersonasOptions(username), enabled: !!username });
  const stored = useQuery(homePetsOptions(username));

  const all = useMemo(
    () => [...(personas.data?.personas ?? [])].sort((a, b) => Number(b.level) - Number(a.level)),
    [personas.data],
  );
  const initial = useMemo(() => pickHomePets(all, stored.data ?? null).map((p) => p.id), [all, stored.data]);
  const [picked, setPicked] = useState<string[] | null>(null);
  const [saving, setSaving] = useState(false);
  const current = picked ?? initial;
  const selected = useMemo(() => new Set(current), [current]);
  const preview = useMemo(() => all.filter((p) => selected.has(p.id)), [all, selected]);
  const toggle = useCallback(
    (id: string) => setPicked((prev) => toggleSelection(prev ?? initial, id, HOME_PET_MAX)),
    [initial],
  );
  const changed = picked !== null && (picked.length !== initial.length || picked.some((id) => !initial.includes(id)));

  const save = async () => {
    setSaving(true);
    try {
      await saveHomePets(username, current);
      queryClient.setQueryData(homePetsKey(username), current);
      router.back();
    } finally {
      setSaving(false);
    }
  };

  const { width } = useWindowDimensions();
  const cell = (width - 32 - GAP * 3) / 4;

  return (
    <View className="flex-1" style={{ backgroundColor: BG, paddingTop: insets.top }}>
      <View style={{ height: 44, justifyContent: 'center', alignItems: 'center' }}>
        <Pressable accessibilityRole="button" accessibilityLabel={t('common.back')} onPress={() => router.back()} style={{ position: 'absolute', left: 16 }} hitSlop={10}>
          <Image source={require('../assets/ui/chevron-left.png')} style={{ width: 24, height: 24 }} />
        </Pressable>
        <Text style={[sans(18, 1.2, true), { color: colors.white.DEFAULT }]}>{t('selectPet.title')}</Text>
      </View>
      <FlatList
        data={all}
        keyExtractor={(p) => p.id}
        numColumns={4}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 160, gap: GAP }}
        ListHeaderComponent={
          <View style={{ gap: 24, marginBottom: 12 - GAP }}>
            <View style={{ gap: 12 }}>
              <Text style={[sans(15, 1.5, true), { color: colors.white.DEFAULT }]}>{t('selectPet.preview')}</Text>
              <View style={{ height: PREVIEW_HEIGHT, borderRadius: 8, overflow: 'hidden' }}>
                <Image source={require('../assets/home/preview-bg.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} />
                <PetStage personas={preview} fieldTop={0} fieldBottom={1} />
              </View>
            </View>
            <View className="flex-row items-start justify-between">
              <Text style={[sans(15, 1.5), { color: colors.white['50'] }]}>{t('selectPet.hint')}</Text>
              <Text style={sans(15, 1.5)}>
                <Text style={{ color: colors.white['90'] }}>{current.length}</Text>
                <Text style={{ color: colors.white['50'] }}>{`/${HOME_PET_MAX}`}</Text>
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <PetCell persona={item} size={cell} selected={selected.has(item.id)} onToggle={toggle} />
        )}
      />
      <Dim width={width} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 16, paddingTop: 8, paddingBottom: insets.bottom + 8 }}>
        <CanaryButton label={t('selectPet.save')} className="h-10 px-4" disabled={!changed || saving} onPress={() => void save()} />
      </View>
    </View>
  );
}
