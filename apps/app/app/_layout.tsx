import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import DebugPath from '../components/DebugPath';
import { SafeAreaView, View, StatusBar } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '../hooks/useAuth'; // 인증 상태 관리 훅

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (isLoading) {
    return null; // 또는 로딩 화면
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#212429' }}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#212429" translucent={true} /> */}
      {/* <SafeAreaView style={{ backgroundColor: '#212429' }}>
        <DebugPath />
      </SafeAreaView> */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          initialRouteName={isAuthenticated ? '(tabs)' : 'auth/login'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="auth/login"
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
          <Stack.Screen name="auth/success" options={{ title: '로그인 완료' }} />

          {/* test/auth-web?token= */}
          <Stack.Screen name="test/auth-web" options={{ title: '로그인 완료' }} />
        </Stack>
      </ThemeProvider>
    </View>
  );
}
