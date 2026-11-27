import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PixelBox, PixelButton, PixelSprite, PixelText } from '../../src/ui/pixel';
import { FarmBackground } from '../../src/home/FarmBackground';
import { personaImageUrl } from '../../src/home/pickHomePets';
import { useAuth } from '../../src/auth/AuthProvider';
import { loginWithGithub } from '../../src/auth/githubLogin';
import { FONT } from '../../src/ui/pixel/glyph';

function DevTokenForm() {
  const { signIn } = useAuth();
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      await signIn(token);
    } catch (e) {
      setError(e instanceof Error ? e.message : '로그인에 실패했습니다');
      setBusy(false);
    }
  };

  return (
    <View className="gap-3">
      <PixelText variant="glyph16" bold>개발용 토큰 로그인</PixelText>
      <TextInput
        testID="dev-token-input"
        value={token}
        onChangeText={setToken}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="웹에서 복사한 토큰"
        className="border-2 border-gray-000 px-2 py-2"
        style={{ fontFamily: FONT.body, fontSize: 14 }}
      />
      {error && <PixelText variant="glyph14">{error}</PixelText>}
      <PixelButton label="토큰으로 로그인" onPress={submit} disabled={busy || token.trim() === ''} />
    </View>
  );
}

function GithubLoginButton() {
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const login = async () => {
    setBusy(true);
    setFailed(false);
    try {
      const jwt = await loginWithGithub();
      if (jwt) await signIn(jwt);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View className="gap-2">
      <PixelButton label={t('auth.github_login')} onPress={login} disabled={busy} wide />
      {failed && <PixelText variant="glyph14" className="text-white">{t('auth.login_failed')}</PixelText>}
    </View>
  );
}

export default function Login() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-gray-000">
      <FarmBackground />
      <View className="items-center" style={{ paddingTop: insets.top + 96 }}>
        <View className="items-end">
          <PixelSprite source={personaImageUrl('LITTLE_CHICK')} maxWidth={70} maxHeight={70} />
          {/* 피그마 로고 3배 export(726×198)를 1/3 로 */}
          <Image source={require('../../assets/brand/logo.png')} style={{ width: 242, height: 66 }} accessibilityLabel="Git Animals" />
        </View>
      </View>
      <View className="absolute inset-x-0 bottom-0 gap-4 px-4" style={{ paddingBottom: insets.bottom + 24 }}>
        <GithubLoginButton />
        {__DEV__ && (
          <PixelBox className="self-stretch">
            <DevTokenForm />
          </PixelBox>
        )}
      </View>
    </View>
  );
}
