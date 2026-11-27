import '../global.css';
import '../src/i18n';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FONT } from '../src/ui/pixel/glyph';
import { AuthProvider, useAuth } from '../src/auth/AuthProvider';

SplashScreen.preventAutoHideAsync().catch(() => {});

const HOME_ROUTE = '(tabs)';

function AuthStack() {
  const { status } = useAuth();

  useEffect(() => {
    if (status !== 'loading') SplashScreen.hideAsync().catch(() => {});
  }, [status]);

  if (status === 'loading') return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={status === 'signedIn'}>
        <Stack.Screen name={HOME_ROUTE} />
        <Stack.Screen name="select-pet" />
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
