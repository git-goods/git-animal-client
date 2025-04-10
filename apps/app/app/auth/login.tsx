import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { handleGithubLogin } from '../../utils/github';
import { router } from 'expo-router';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { StatusBar } from 'expo-status-bar';

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

  const onPressAppleLogin = async () => {
    console.log('Apple 로그인 시작');
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>GitAnimals</Text>
          <Text style={styles.tagline}>당신의 GitHub 활동을 동물로 표현하세요</Text>
        </View>

        {isAuthenticated ? (
          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>로그인 완료</Text>
            <TouchableOpacity onPress={onPressLogout} style={styles.logoutButton}>
              <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <TouchableOpacity onPress={onPressAppleLogin} style={styles.githubButton}>
              <Text style={styles.buttonText}>Apple 계정으로 로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressGithubLogin} style={styles.githubButton}>
              <Text style={styles.buttonText}>GitHub 계정으로 로그인</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  tagline: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
    color: '#ffffff',
    fontWeight: '500',
  },
  githubButton: {
    backgroundColor: '#24292e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 280,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 280,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
