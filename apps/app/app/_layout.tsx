import '../global.css';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FONT } from '../src/ui/pixel/glyph';
import { AuthProvider, useAuth } from '../src/auth/AuthProvider';

SplashScreen.preventAutoHideAsync();

// 로그인 후 첫 화면. Task 6 에서 '(tabs)' 로 바꾼다.
const HOME_ROUTE = 'index';

function AuthStack() {
  const { status } = useAuth();
  if (status === 'loading') return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={status === 'signedIn'}>
        <Stack.Screen name={HOME_ROUTE} />
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
    [FONT.title]: require('../assets/fonts/DNFBitBitv2.otf'),
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthStack />
      </AuthProvider>
    </QueryClientProvider>
  );
}
