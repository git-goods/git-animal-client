import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import { PixelButton, PixelPanel, PixelText } from '../../src/ui/pixel';
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
      <PixelButton label={t('auth.github_login')} onPress={login} disabled={busy} />
      {failed && <PixelText variant="glyph14">{t('auth.login_failed')}</PixelText>}
    </View>
  );
}

export default function Login() {

  return (
    <View className="flex-1 items-center justify-center px-6">
      <PixelPanel source={require('../../assets/ui/panel.png')} style={{ width: '100%' }}>
        <View className="gap-4 p-6">
          <PixelText variant="glyph24" title>GitAnimals</PixelText>
          <GithubLoginButton />
          {__DEV__ && <DevTokenForm />}
        </View>
      </PixelPanel>
    </View>
  );
}
