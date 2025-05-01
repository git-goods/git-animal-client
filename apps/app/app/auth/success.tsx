import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function LoginSuccessScreen() {
  const { checkAuth } = useAuth();

  const goToMain = async () => {
    // 인증 상태 업데이트 후 메인으로 이동
    await checkAuth();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인 완료!</Text>
      <Text style={styles.subtitle}>GitAnimals를 시작해보세요</Text>

      <TouchableOpacity onPress={goToMain} style={styles.button}>
        <Text style={styles.buttonText}>시작하기</Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#24292e',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    opacity: 0.8,
    color: '#586069',
  },
  button: {
    backgroundColor: '#2ea44f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
