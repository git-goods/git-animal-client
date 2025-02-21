import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { handleGithubLogin } from '../../utils/github';
import { router } from 'expo-router';
import React from 'react';

export default function LoginScreen() {
  const onPressGithubLogin = async () => {
    try {
      const token = await handleGithubLogin();
      console.log('token: ', token);
      if (token) {
        // 토큰 저장 후 메인 화면으로 이동
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('GitHub 로그인 실패:', error);
      // 에러 처리 (예: 알림 표시)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitAnimals</Text>
      <Text style={styles.subtitle}>GitHub으로 시작하기</Text>

      <TouchableOpacity onPress={onPressGithubLogin} style={styles.githubButton}>
        <Text style={styles.buttonText}>GitHub 계정으로 로그인</Text>
      </TouchableOpacity>
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
