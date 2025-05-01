import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../../hooks/useAuth';

export default function AuthPage() {
  const params = useLocalSearchParams<{ jwt: string; code: string }>();
  const { checkAuth } = useAuth();
  console.log('Auth params:', params);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        if (params.jwt) {
          // JWT 토큰 처리
          const token = params.jwt.split(' ')[1] || params.jwt;
          console.log('token: ', token);

          // 토큰 저장
          await SecureStore.setItemAsync('auth_token', token);
          // 인증 상태 업데이트
          await checkAuth();

          router.replace('/auth/success');
        } else if (params.code) {
          // GitHub 인증 코드 처리
          console.log('GitHub code:', params.code);
          const response = await fetch('https://api.gitanimals.org/logins/oauth/github/tokens/LOCAL', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: params.code }),
          });

          if (response.ok) {
            const data = await response.json();
            await SecureStore.setItemAsync('auth_token', data.token);
            // 인증 상태 업데이트
            await checkAuth();
            router.replace('/auth/success');
          } else {
            throw new Error('토큰 교환 실패');
          }
        } else {
          throw new Error('인증 정보가 없습니다');
        }
      } catch (error) {
        console.error('Auth error:', error);
        router.replace('/auth/login');
      }
    };

    handleAuth();
  }, [params, checkAuth]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
