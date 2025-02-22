import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { handleGithubLogin } from '../../utils/github';
import { router } from 'expo-router';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen() {
  const { isAuthenticated, logout } = useAuth();

  const onPressGithubLogin = async () => {
    try {
      const result = await handleGithubLogin();
      console.log('Login result:', result);
      if (result === 'success') {
        console.log('GitHub 로그인 성공');
        // 로그인 성공 시 success 페이지로 이동
        router.replace('/auth/success');
      }
    } catch (error) {
      console.error('GitHub 로그인 실패:', error);
      // 에러 처리 (예: 알림 표시)
    }
  };

  const onPressLogout = async () => {
    try {
      await logout();
      router.replace('/auth/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitAnimals</Text>

      {isAuthenticated ? (
        <>
          <Text style={styles.subtitle}>로그인 완료</Text>
          <TouchableOpacity onPress={onPressLogout} style={styles.logoutButton}>
            <Text style={styles.buttonText}>로그아웃</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>GitHub으로 시작하기</Text>
          <TouchableOpacity onPress={onPressGithubLogin} style={styles.githubButton}>
            <Text style={styles.buttonText}>GitHub 계정으로 로그인</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    opacity: 0.8,
  },
  githubButton: {
    backgroundColor: '#24292e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 250,
    alignItems: 'center', // 버튼 내부 텍스트 중앙 정렬
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
