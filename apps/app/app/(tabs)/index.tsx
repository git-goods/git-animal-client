import { Pressable, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { userQueries } from '@gitanimals/react-query';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FarmBackground, FARM_FIELD } from '../../src/home/FarmBackground';
import { homePetsOptions } from '../../src/home/homePetSelection';
import { PetStage } from '../../src/home/PetStage';
import { pickHomePets } from '../../src/home/pickHomePets';
import { ProfileBoard } from '../../src/home/ProfileBoard';
import { RetryNotice } from '../../src/home/RetryNotice';
import { ScoreBoard } from '../../src/home/ScoreBoard';
import { PAW_ROWS, PixelBox, PixelIcon, PixelText, WOOD } from '../../src/ui/pixel';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useQuery(userQueries.userOptions());
  const username = user.data?.username ?? '';
  const personas = useQuery({ ...userQueries.allPersonasOptions(username), enabled: !!username });
  const selection = useQuery(homePetsOptions(username));

  const loading = user.isPending || (!!username && (personas.isPending || selection.isPending));

  return (
    <View className="flex-1 bg-gray-000">
      <FarmBackground />
      {!user.isError && !loading && user.data && !personas.isError && (
        <PetStage
          personas={pickHomePets(personas.data?.personas ?? [], selection.data ?? null)}
          fieldTop={FARM_FIELD.top}
          fieldBottom={FARM_FIELD.bottom}
        />
      )}
      <View className="gap-3 px-4" style={{ paddingTop: insets.top + 12 }} pointerEvents="box-none">
        {user.isError ? (
          <RetryNotice onRetry={() => void user.refetch()} />
        ) : loading || !user.data ? (
          <PixelText variant="glyph14" className="text-white">{t('common.loading')}</PixelText>
        ) : (
          <>
            <ProfileBoard username={user.data.username} points={user.data.points} profileImage={user.data.profileImage} />
            {personas.data && (
              <ScoreBoard contribution={personas.data.totalContributions} petCount={personas.data.personas.length} />
            )}
            {personas.isError && <RetryNotice onRetry={() => void personas.refetch()} />}
          </>
        )}
      </View>
      {!!username && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('selectPet.title')}
          onPress={() => router.push('/select-pet')}
          className="absolute bottom-4 right-4"
        >
          <PixelBox tone="wood">
            <PixelIcon rows={PAW_ROWS} palette={{ O: WOOD.outline, C: WOOD.cream }} unit={3} />
          </PixelBox>
        </Pressable>
      )}
    </View>
  );
}
