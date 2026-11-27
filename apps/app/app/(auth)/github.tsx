import { useRef, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../src/auth/AuthProvider';
import { extractJwt, GITHUB_LOGIN_URL } from '../../src/auth/githubLogin';
import { PixelButton, PixelText } from '../../src/ui/pixel';

export default function GithubLogin() {
  const { signIn } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const handled = useRef(false);
  const [failed, setFailed] = useState(false);

  const onJwt = async (jwt: string) => {
    try {
      await signIn(jwt);
    } catch {
      setFailed(true);
    }
  };

  return (
    <View className="flex-1 bg-gray-000" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-4 py-2">
        <PixelText variant="glyph16" bold className="text-white">{t('auth.github_login')}</PixelText>
        <PixelButton label={t('common.close')} onPress={() => router.back()} />
      </View>
      {failed ? (
        <View className="flex-1 items-center justify-center bg-white p-6">
          <PixelText variant="glyph14">{t('auth.login_failed')}</PixelText>
        </View>
      ) : (
        <WebView
          source={{ uri: GITHUB_LOGIN_URL }}
          incognito
          sharedCookiesEnabled={false}
          onShouldStartLoadWithRequest={(req) => {
            const jwt = extractJwt(req.url);
            if (!jwt) return true;
            // 웹 페이지는 열지 않고 토큰만 앱으로 가져온다
            if (!handled.current) {
              handled.current = true;
              void onJwt(jwt);
            }
            return false;
          }}
        />
      )}
    </View>
  );
}
