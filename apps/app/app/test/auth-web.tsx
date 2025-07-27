import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function AuthWebPage() {
  const params = useLocalSearchParams<{ token: string }>();
  const { testLogin } = useAuth();

  console.log('params', params);

  const handleTokenLogin = async () => {
    try {
      if (params.token) {
        console.log('토큰으로 로그인 시도:', params.token);

        // 웹 환경에서 토큰 저장
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          localStorage.setItem('auth_token', params.token);
          console.log('토큰 저장 완료');
        }

        // 테스트 로그인 실행 (상태 업데이트)
        const success = await testLogin(params.token);

        if (success) {
          console.log('토큰 로그인 성공');
          // 성공 페이지로 리다이렉트
          router.replace('/auth/success');
        } else {
          console.error('토큰 로그인 실패');
          alert('토큰 로그인에 실패했습니다.');
        }
      } else {
        console.log('토큰이 없습니다');
        alert('URL에 토큰이 없습니다.');
      }
    } catch (error) {
      console.error('토큰 로그인 중 오류:', error);
      alert('토큰 로그인 중 오류가 발생했습니다.');
    }
  };

  const handleTestLogin = async () => {
    try {
      console.log('테스트 로그인 시도');
      const success = await testLogin(params.token);

      if (success) {
        console.log('테스트 로그인 성공');
        router.replace('/auth/success');
      } else {
        console.error('테스트 로그인 실패');
        alert('테스트 로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('테스트 로그인 중 오류:', error);
      alert('테스트 로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>테스트 로그인 페이지</Text>

      {params.token ? (
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenText}>토큰: {params.token}</Text>
          <TouchableOpacity onPress={handleTokenLogin} style={styles.button}>
            <Text style={styles.buttonText}>🔑 토큰으로 로그인</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.noTokenText}>URL에 토큰이 없습니다</Text>
      )}

      <TouchableOpacity onPress={handleTestLogin} style={styles.testButton}>
        <Text style={styles.buttonText}>🧪 테스트 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/auth/login')} style={styles.backButton}>
        <Text style={styles.buttonText}>← 로그인 페이지로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  tokenInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tokenText: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 15,
    textAlign: 'center',
  },
  noTokenText: {
    fontSize: 16,
    color: '#ff6b6b',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 250,
    alignItems: 'center',
    marginBottom: 15,
  },
  testButton: {
    backgroundColor: '#ff6b35',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 250,
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: '#666666',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
