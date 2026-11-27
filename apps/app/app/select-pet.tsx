import { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userQueries } from '@gitanimals/react-query';
import type { Persona } from '@gitanimals/api';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FARM_FIELD, FARM_IMAGE } from '../src/home/FarmBackground';
import { homePetsKey, homePetsOptions, saveHomePets } from '../src/home/homePetSelection';
import { PetStage } from '../src/home/PetStage';
import { HOME_PET_MAX, personaImageUrl, pickHomePets } from '../src/home/pickHomePets';
import { toggleSelection } from '../src/home/toggleSelection';
import { PixelBox, PixelButton, PixelSprite, PixelText, WOOD } from '../src/ui/pixel';

const PREVIEW_HEIGHT = 210;
const CELL = 70;

function PetCell({ persona, selected, onPress }: { persona: Persona; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={persona.type}
      onPress={onPress}
      className="flex-1 p-1"
    >
      <PixelBox tone={selected ? 'gold' : 'wood'} shadow={false}>
        <View className="items-center" style={{ opacity: selected ? 1 : 0.6 }}>
          <PixelSprite source={personaImageUrl(persona.type)} maxWidth={CELL} maxHeight={CELL} />
          <PixelText variant="glyph12" style={{ color: WOOD.ink }}>{`Lv.${persona.level}`}</PixelText>
        </View>
      </PixelBox>
    </Pressable>
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

  return (
    <View className="flex-1" style={{ paddingTop: insets.top, backgroundColor: WOOD.mid }}>
      <View className="flex-row items-center gap-3 px-4 py-2">
        <PixelButton label="<" onPress={() => router.back()} />
        <PixelText variant="glyph18" bold style={{ color: WOOD.ink }}>{t('selectPet.title')}</PixelText>
      </View>
      <FlatList
        data={all}
        keyExtractor={(p) => p.id}
        numColumns={4}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 120 }}
        ListHeaderComponent={
          <View className="gap-3 px-1 pb-2 pt-2">
            <PixelBox shadow={false} className="self-stretch">
              <View style={{ height: PREVIEW_HEIGHT, margin: -9, overflow: 'hidden' }}>
                <Image source={FARM_IMAGE} resizeMode="cover" className="absolute inset-x-0" style={{ top: '-75%', height: '250%' }} />
                <PetStage personas={all.filter((p) => current.includes(p.id))} fieldTop={0.05} fieldBottom={0.95} />
              </View>
            </PixelBox>
            <View className="flex-row items-center justify-between">
              <PixelText variant="glyph14" style={{ color: WOOD.ink }}>{t('selectPet.hint')}</PixelText>
              <PixelText variant="glyph14" bold style={{ color: WOOD.ink }}>{`${current.length}/${HOME_PET_MAX}`}</PixelText>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <PetCell
            persona={item}
            selected={current.includes(item.id)}
            onPress={() => setPicked(toggleSelection(current, item.id, HOME_PET_MAX))}
          />
        )}
      />
      <View className="absolute inset-x-0 bottom-0 px-4 pt-3" style={{ paddingBottom: insets.bottom + 12, backgroundColor: WOOD.mid }}>
        <PixelButton label={t('selectPet.save')} onPress={() => void save()} disabled={!changed || saving} wide />
      </View>
    </View>
  );
}
