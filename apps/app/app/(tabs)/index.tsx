import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { router, useRouter } from 'expo-router';
import CustomWebView from '../../components/CustomWebView';
import { useAuth } from '../../hooks/useAuth';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabOneScreen() {
  const { isAuthenticated, logout, token } = useAuth();
  const router = useRouter();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 첫 렌더링에서는 리다이렉트 스킵
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // 이후 렌더링에서만 리다이렉트 수행
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated]);

  const onPressLogout = async () => {
    try {
      await logout();
      router.replace('/auth/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#212429" translucent={true} />
      <SafeAreaView style={styles.container}>
        {/* 커스텀 헤더 */}
        {/* <View style={styles.customHeader}>
          <Text style={styles.headerTitle}>GitAnimals</Text>
        </View> */}
        <View style={styles.webViewContainer}>
          <CustomWebView url="http://192.168.0.38:3000/" token={token} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#212429',
  },
  container: {
    flex: 1,
    backgroundColor: '#212429',
  },
  safeArea: {
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#24292e',
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  webViewContainer: {
    flex: 1,
  },
  customHeader: {
    height: 50,
    backgroundColor: '#212429',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
