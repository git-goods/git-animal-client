import { useMemo } from 'react';
import { Image, Pressable, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '@gitanimals/ui-tailwind/theme';
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
import { PixelText } from '../../src/ui/pixel';
import { TAB_BAR_HEIGHT } from '../../src/ui/TabBar';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useQuery(userQueries.userOptions());
  const username = user.data?.username ?? '';
  const personas = useQuery({ ...userQueries.allPersonasOptions(username), enabled: !!username });
  const selection = useQuery(homePetsOptions(username));

  const homePets = useMemo(
    () => pickHomePets(personas.data?.personas ?? [], selection.data ?? null),
    [personas.data, selection.data],
  );
  const loading = user.isPending || (!!username && (personas.isPending || selection.isPending));

  return (
    <View className="flex-1">
      <FarmBackground />
      {!user.isError && !loading && user.data && !personas.isError && (
        <PetStage
          personas={homePets}
          fieldTop={FARM_FIELD.top}
          fieldBottom={FARM_FIELD.bottom}
        />
      )}
      <View style={{ paddingTop: insets.top + 8, gap: 14 }} pointerEvents="box-none">
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
          className="absolute"
          // 피그마 943:18128: 탭바 위 18px, 오른쪽 18px
          style={{ right: 18, bottom: TAB_BAR_HEIGHT + insets.bottom + 18 }}
        >
          {/* 피그마 943:18128: 흐림 40 위 검정 20% 원과 흰 paw-print 24 */}
          <View style={{ width: 48, height: 48, borderRadius: 24, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
            <BlurView intensity={40} className="absolute inset-0" />
            <View className="absolute inset-0" style={{ backgroundColor: colors.black['25'] }} />
            <Image source={require('../../assets/home/paw.png')} style={{ width: 24, height: 24 }} />
          </View>
        </Pressable>
      )}
    </View>
  );
}
