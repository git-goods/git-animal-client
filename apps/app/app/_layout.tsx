import '../global.css';
import '../src/i18n';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FONT } from '../src/ui/pixel/glyph';
import { AuthProvider, useAuth } from '../src/auth/AuthProvider';
import { FarmBackground } from '../src/home/FarmBackground';
import { CenterLogo } from '../src/ui/CenterLogo';

SplashScreen.preventAutoHideAsync().catch(() => {});

const HOME_ROUTE = '(tabs)';

const hideNativeSplash = () => SplashScreen.hideAsync().catch(() => {});

// 네이티브 스플래시는 이미지 한 장이라 농장 배경을 못 깐다. 로고가 그려진 뒤 이 화면이 이어 받아야 로고가 깜빡이지 않는다
function FarmSplash() {
  return (
    <View className="flex-1">
      <FarmBackground tabBar={false} />
      <CenterLogo onLoadEnd={hideNativeSplash} />
    </View>
  );
}

function AuthStack() {
  const { status } = useAuth();

  useEffect(() => {
    if (status !== 'loading') hideNativeSplash();
  }, [status]);

  if (status === 'loading') return <FarmSplash />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={status === 'signedIn'}>
        <Stack.Screen name={HOME_ROUTE} />
        <Stack.Screen name="select-pet" />
        <Stack.Screen name="gotcha" options={{ animation: 'fade' }} />
        <Stack.Screen name="settings" />
        <Stack.Screen name="terms" />
      </Stack.Protected>
      <Stack.Protected guard={status === 'signedOut'}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [loaded, error] = useFonts({
    [FONT.body]: require('../assets/fonts/Galmuri11.ttf'),
    [FONT.bodyBold]: require('../assets/fonts/Galmuri11-Bold.ttf'),
    [FONT.sans]: require('../assets/fonts/ProductSans-Regular.ttf'),
    [FONT.sansBold]: require('../assets/fonts/ProductSans-Bold.ttf'),
  });

  if (!loaded && !error) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthStack />
      </AuthProvider>
    </QueryClientProvider>
  );
}
