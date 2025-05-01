import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function AuthCallback() {
  const params = useLocalSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = params.token as string;
        if (token) {
          await SecureStore.setItemAsync('auth_token', token);
          router.replace('/(tabs)');
        } else {
          router.replace('/auth/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.replace('/auth/login');
      }
    };

    handleCallback();
  }, [params]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
