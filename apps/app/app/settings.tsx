import { useState } from 'react';
import { Alert, Image, type ImageSourcePropType, Linking, Pressable, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../src/auth/AuthProvider';
import { AppBar } from '../src/ui/AppBar';
import { ConfirmDialog } from '../src/ui/ConfirmDialog';
import { sans } from '../src/ui/sans';

const FEEDBACK_URL = 'https://github.com/git-goods/gitanimals/issues/new';

// 피그마 list_menu: 아이콘 20, 글자 16 gray-800, 오른쪽 chevron, 아래 흰 10% 선
function MenuRow({ icon, label, onPress }: { icon: ImageSourcePropType; label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={{ borderBottomWidth: 1, borderColor: colors['white-alpha']['10'] }}>
      <View className="flex-row items-center" style={{ gap: 8, paddingHorizontal: 20, paddingVertical: 18 }}>
        <View className="flex-1 flex-row items-center" style={{ gap: 12 }}>
          <Image source={icon} style={{ width: 20, height: 20 }} />
          <Text style={[sans(16, 1.5), { color: colors.gray['800'] }]}>{label}</Text>
        </View>
        <Image source={require('../assets/ui/chevron-right.png')} style={{ width: 24, height: 24 }} />
      </View>
    </Pressable>
  );
}

// 피그마 943:38213 Setting
export default function Settings() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const [dialog, setDialog] = useState<'logout' | 'delete' | null>(null);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.gray['050'], paddingTop: insets.top }}>
      <AppBar title={t('settings.setting')} />
      <MenuRow icon={require('../assets/ui/circle-help.png')} label={t('settings.feedback')} onPress={() => void Linking.openURL(FEEDBACK_URL)} />
      <MenuRow icon={require('../assets/ui/message-square-text.png')} label={t('settings.terms')} onPress={() => router.push('/terms')} />
      <MenuRow icon={require('../assets/ui/log-out.png')} label={t('settings.logout')} onPress={() => setDialog('logout')} />
      <MenuRow icon={require('../assets/ui/user-round-x.png')} label={t('settings.deleteAccount')} onPress={() => setDialog('delete')} />
      <ConfirmDialog
        visible={dialog === 'logout'}
        message={t('settings.logoutConfirmShort')}
        confirmLabel={t('settings.logout')}
        tone="red"
        onCancel={() => setDialog(null)}
        onConfirm={() => {
          setDialog(null);
          void signOut();
        }}
      />
      <ConfirmDialog
        visible={dialog === 'delete'}
        message={t('settings.deleteConfirm')}
        confirmLabel={t('settings.delete')}
        tone="red"
        onCancel={() => setDialog(null)}
        onConfirm={() => {
          setDialog(null);
          // ponytail: 서버 탈퇴 API(git-goods/gitanimals#519)가 생기면 호출 후 signOut
          Alert.alert(t('settings.deletePending'));
        }}
      />
    </View>
  );
}
