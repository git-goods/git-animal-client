import { View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { userQueries } from '@gitanimals/react-query';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PetStage } from '../../src/home/PetStage';
import { pickHomePets } from '../../src/home/pickHomePets';
import { ProfileBoard } from '../../src/home/ProfileBoard';
import { PixelText } from '../../src/ui/pixel';

export default function Home() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const user = useQuery(userQueries.userOptions());
  const username = user.data?.username ?? '';
  const personas = useQuery({ ...userQueries.allPersonasOptions(username), enabled: !!username });

  const loading = user.isPending || (!!username && personas.isPending);

  return (
    <View
      className="flex-1 justify-between bg-brand-green px-4 pb-6"
      style={{ paddingTop: insets.top + 24 }}
    >
      {loading || !user.data ? (
        <PixelText variant="glyph14" className="text-white">{t('common.loading')}</PixelText>
      ) : (
        <>
          <ProfileBoard
            username={user.data.username}
            points={user.data.points}
            profileImage={user.data.profileImage}
          />
          <PetStage personas={pickHomePets(personas.data?.personas ?? [])} />
        </>
      )}
    </View>
  );
}
