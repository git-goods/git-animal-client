# React Native 앱에서 웹뷰 브릿지 사용 예시

이 문서는 React Native 앱에서 웹뷰와 통신하는 방법을 보여주는 예시 코드입니다.

## 기본 WebView 컴포넌트

```typescript
import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { router } from 'expo-router';

interface WebViewMessage {
  type: string;
  data?: any;
  message?: string;
}

export default function CustomWebView() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const onMessage = async (event: any) => {
    try {
      const { type, data, message } = JSON.parse(event.nativeEvent.data) as WebViewMessage;
      console.log('[WebView Debug] Received message:', { type, data, message });

      switch (type) {
        case 'navigation':
          setCanGoBack(data.canGoBack);
          break;

        case 'GITHUB_LOGIN':
          await handleGithubLogin();
          break;

        case 'LOGOUT':
          console.log('[WebView Debug] Logout request received from webview');
          // 웹뷰에 로그아웃 요청 전송
          sendMessageToWebView('LOGOUT');
          break;

        case 'LOGOUT_COMPLETED':
          console.log('[WebView Debug] Webview logout completed');
          // React Native 앱 로그아웃
          await logout();
          router.replace('/auth/login');
          break;

        case 'REQUEST_AUTH':
          console.log('[WebView Debug] Auth request received from webview');
          // 인증이 필요한 경우 처리
          await handleAuthRequest();
          break;

        case 'TOKENS_SET':
          console.log('[WebView Debug] Tokens set successfully in webview');
          break;

        default:
          console.log('[WebView Debug] Unknown message type:', type);
      }
    } catch (error) {
      console.log('[WebView Debug] Failed to parse webview message:', error);
    }
  };

  const sendMessageToWebView = (type: string, data: any = {}) => {
    const message = { type, ...data };
    webViewRef.current?.postMessage(JSON.stringify(message));
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'your-webview-url' }}
      onMessage={onMessage}
      // 웹뷰에서 window.ReactNativeWebView 사용 가능하도록 설정
      injectedJavaScript={`
        window.ReactNativeWebView = window.ReactNativeWebView || {};
        true;
      `}
      // 추가 WebView 설정
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scalesPageToFit={true}
      // iOS 설정
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      // Android 설정
      androidLayerType="hardware"
    />
  );
}
```

## GitHub 로그인 처리

```typescript
const handleGithubLogin = async () => {
  try {
    console.log('[WebView Debug] Handling GitHub login...');
    
    // GitHub OAuth 로그인 처리
    // 여기에 실제 GitHub 로그인 로직 구현
    const result = await performGithubLogin();
    
    if (result.success && result.token) {
      // 웹뷰로 토큰 전송
      sendMessageToWebView('SET_TOKEN', {
        token: result.token,
      });
    }
  } catch (error) {
    console.error('[WebView Debug] GitHub login failed:', error);
  }
};

const performGithubLogin = async () => {
  // 실제 GitHub 로그인 구현
  // 이 부분은 실제 OAuth 플로우에 맞게 구현해야 합니다
  return { success: true, token: 'sample-token' };
};
```

## 인증 요청 처리

```typescript
const handleAuthRequest = async () => {
  try {
    console.log('[WebView Debug] Handling auth request...');
    
    // 현재 저장된 토큰이 있는지 확인
    const token = await getStoredToken();
    
    if (token) {
      // 토큰을 웹뷰로 전송
      sendMessageToWebView('SET_TOKEN', {
        token: token,
      });
    } else {
      // 토큰이 없으면 로그인 페이지로 이동
      router.push('/auth/login');
    }
  } catch (error) {
    console.error('[WebView Debug] Auth request handling failed:', error);
  }
};

const getStoredToken = async () => {
  // 저장된 토큰 가져오기
  // AsyncStorage 또는 다른 저장소에서 토큰을 가져오는 로직
  return null;
};
```

## 로그아웃 처리

```typescript
const logout = async () => {
  try {
    console.log('[WebView Debug] Performing logout...');
    
    // 저장된 토큰 삭제
    await clearStoredToken();
    
    // 기타 로그아웃 처리
    // ...
  } catch (error) {
    console.error('[WebView Debug] Logout failed:', error);
  }
};

const clearStoredToken = async () => {
  // 저장된 토큰 삭제
  // AsyncStorage 또는 다른 저장소에서 토큰을 삭제하는 로직
};
```

## AsyncStorage를 사용한 토큰 관리

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// 토큰 저장
const storeToken = async (token: string, refreshToken?: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) {
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// 토큰 가져오기
const getStoredToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// 토큰 삭제
const clearStoredToken = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY]);
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};
```

## GitHub OAuth 로그인 구현 예시

```typescript
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const useGithubAuth = () => {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'your-github-client-id',
      scopes: ['identity', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'your-app-scheme',
      }),
    },
    { authorizationEndpoint: 'https://github.com/login/oauth/authorize' }
  );

  const performGithubLogin = async () => {
    try {
      const result = await promptAsync();
      
      if (result.type === 'success') {
        const { code } = result.params;
        
        // 서버에 인증 코드 전송하여 토큰 받기
        const tokenResponse = await fetch('your-backend-url/auth/github', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
        
        const { accessToken, refreshToken } = await tokenResponse.json();
        
        // 토큰 저장
        await storeToken(accessToken, refreshToken);
        
        return { success: true, token: accessToken };
      }
      
      return { success: false, error: 'Authentication cancelled' };
    } catch (error) {
      console.error('GitHub login error:', error);
      return { success: false, error: error.message };
    }
  };

  return { performGithubLogin };
};
```

## 메시지 타입 정의

```typescript
// 웹뷰에서 앱으로 보내는 메시지 타입
type WebViewToAppMessage = 
  | { type: 'GITHUB_LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'REQUEST_AUTH' }
  | { type: 'TOKENS_SET'; message: string }
  | { type: 'LOGOUT_COMPLETED' }
  | { type: 'navigation'; data: { url: string; canGoBack: boolean } }
  | { type: string; data?: any; message?: string };

// 앱에서 웹뷰로 보내는 메시지 타입
type AppToWebViewMessage = 
  | { type: 'SET_TOKEN'; token: string }
  | { type: 'LOGOUT' }
  | { type: string; data?: any };
```

## 에러 처리 및 로깅

```typescript
const handleWebViewError = (error: any) => {
  console.error('[WebView Error]', error);
  // 에러 처리 로직
};

const logWebViewMessage = (message: WebViewToAppMessage) => {
  if (__DEV__) {
    console.log('[WebView Message]', message);
  }
};

// WebView 컴포넌트에 에러 핸들러 추가
<WebView
  ref={webViewRef}
  source={{ uri: 'your-webview-url' }}
  onMessage={onMessage}
  onError={handleWebViewError}
  onHttpError={handleWebViewError}
  // ... 기타 props
/>
```

## 완전한 예시 컴포넌트

```typescript
import React, { useRef, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WebViewScreen() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onMessage = async (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log('[WebView Debug] Received message:', message);

      switch (message.type) {
        case 'navigation':
          setCanGoBack(message.data.canGoBack);
          break;
        case 'GITHUB_LOGIN':
          await handleGithubLogin();
          break;
        case 'LOGOUT':
          await handleLogout();
          break;
        case 'LOGOUT_COMPLETED':
          router.replace('/auth/login');
          break;
        case 'REQUEST_AUTH':
          await handleAuthRequest();
          break;
      }
    } catch (error) {
      console.error('[WebView Debug] Message parsing error:', error);
    }
  };

  const sendMessageToWebView = (type: string, data: any = {}) => {
    const message = { type, ...data };
    webViewRef.current?.postMessage(JSON.stringify(message));
  };

  const handleGithubLogin = async () => {
    // GitHub 로그인 로직 구현
    console.log('Handling GitHub login...');
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    sendMessageToWebView('LOGOUT');
  };

  const handleAuthRequest = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      sendMessageToWebView('SET_TOKEN', { token });
    } else {
      router.push('/auth/login');
    }
  };

  const handleGoBack = () => {
    if (canGoBack) {
      webViewRef.current?.goBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.title}>웹뷰</Text>
      </View>
      
      <WebView
        ref={webViewRef}
        source={{ uri: 'your-webview-url' }}
        onMessage={onMessage}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        injectedJavaScript={`
          window.ReactNativeWebView = window.ReactNativeWebView || {};
          true;
        `}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        androidLayerType="hardware"
      />
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text>로딩 중...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
```

이 예시들을 참고하여 React Native 앱에서 웹뷰와의 통신을 구현할 수 있습니다.
