import { useEffect, useState } from 'react';
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PixelBox, PixelButton, PixelSprite, PixelText } from '../../src/ui/pixel';
import { FarmBackground } from '../../src/home/FarmBackground';
import { personaImageUrl } from '../../src/home/pickHomePets';
import { AnimatedView, GRID } from '../../src/home/WanderingPet';
import { useAuth } from '../../src/auth/AuthProvider';
import { loginWithGithub } from '../../src/auth/githubLogin';
import { FONT } from '../../src/ui/pixel/glyph';
import { CenterLogo } from '../../src/ui/CenterLogo';
import { sans } from '../../src/ui/sans';

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
  // NativeWind 가 감싼 Pressable 은 함수형 style 을 버려서 눌림 상태를 직접 든다
  const [pressed, setPressed] = useState(false);

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
      {failed && (
        // 버튼과 같은 폭·모서리로 붙여 한 덩어리로 보이게 한다
        <View style={{ borderRadius: 14, backgroundColor: colors['black-alpha']['75'], paddingVertical: 10 }}>
          <Text style={[sans(15, 1.4, true), { color: colors.white, textAlign: 'center' }]}>{t('auth.login_failed')}</Text>
        </View>
      )}
      {/* 피그마 943:28935 */}
      <Pressable
        onPress={login}
        disabled={busy}
        accessibilityRole="button"
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{
          height: 54,
          borderRadius: 14,
          backgroundColor: colors.brand.canary,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: busy ? 0.5 : pressed ? 0.7 : 1,
        }}
      >
        <Image source={require('../../assets/ui/github.png')} style={{ width: 18, height: 18 }} />
        <Text style={[sans(19, 1.26, true), { color: colors.black }]}>{t('auth.github_login')}</Text>
      </Pressable>
    </View>
  );
}

// 홈 펫처럼 3px 격자로 두 번 통통 뛰고 잠깐 쉰다
function HoppingChick() {
  const reducedMotion = useReducedMotion();
  const hop = useSharedValue(0);

  useEffect(() => {
    if (reducedMotion) return;
    const once = [withTiming(-GRID * 2, { duration: 250 }), withTiming(0, { duration: 250 })];
    hop.value = withRepeat(withSequence(...once, ...once, withDelay(1500, withTiming(0, { duration: 0 }))), -1);
  }, [reducedMotion, hop]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateY: Math.round(hop.value / GRID) * GRID }] }));

  return (
    <AnimatedView style={style}>
      <PixelSprite source={personaImageUrl('LITTLE_CHICK')} maxWidth={140} maxHeight={140} />
    </AnimatedView>
  );
}

export default function Login() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <FarmBackground tabBar={false} />
      <CenterLogo>
        {/* 피그마 108px 병아리의 오른쪽 아래 모서리(로고 기준 293, 40)에 맞춘다. 108 은 140px 원본의 정수배가 아니라 1배로 그린다 */}
        <View style={{ position: 'absolute', left: 153, top: -100 }}>
          <HoppingChick />
        </View>
      </CenterLogo>
      {/* 피그마 버튼 아래 끝은 화면 아래에서 116px(홈 인디케이터 34 포함) */}
      <View className="absolute inset-x-0 bottom-0 gap-4 px-4" style={{ paddingBottom: insets.bottom + 82 }}>
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
