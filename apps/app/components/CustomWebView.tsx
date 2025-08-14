import { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, BackHandler, Platform, Linking, ActivityIndicator, Text } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { handleGithubLogin } from '../utils/github';
import { useAuth } from '../hooks/useAuth';
const isDevelopment = __DEV__; // React Native의 개발 모드 플래그

interface CustomWebViewProps {
  url: string;
  token?: string | null;
}

// 웹뷰에서 history 스택을 관리하기 위한 자바스크립트 코드
const INJECTED_JAVASCRIPT = `
(function() {
  console.log('[WebView Debug] Injected script loaded');
  
  function wrap(fn) {
    return function wrapper() {
      var res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'navigation',
        data: { 
          url: window.location.href,
          canGoBack: window.history.length > 1
        }
      }));
      return res;
    }
  }

  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener('popstate', function() {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'navigation',
      data: {
        url: window.location.href,
        canGoBack: window.history.length > 1
      }
    }));
  });

  // 토큰을 웹으로 전달하는 함수
  window.postToken = function(token) {
    console.log('[WebView Debug] postToken called with:', token);
    if (token) {
      fetch('/api/auth/callback/rn-webview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          callbackUrl: window.location.origin 
        })
      })
      .then(response => {
        console.log('[WebView Debug] Token response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('[WebView Debug] Token response data:', data);
        if (data.url) {
          window.location.href = data.url;
        }
      })
      .catch(error => {
        console.error('[WebView Debug] Token posting failed:', error);
      });
    }
  };
})();
true;
`;

const CustomWebView: React.FC<CustomWebViewProps> = ({ url, token }) => {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const { logout } = useAuth();

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    console.log('[WebView Debug] Navigation state changed:', {
      url: navState.url,
      loading: navState.loading,
      canGoBack: navState.canGoBack,
    });

    // 웹뷰 상태 업데이트
    setCanGoBack(navState.canGoBack);

    // 로딩 상태 업데이트
    if (!navState.loading) {
      setLoading(false);
    }
  };

  const onAndroidBackPress = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const subscription = BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        subscription.remove();
      };
    }
  }, [canGoBack]);

  const onShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    const { url: eventUrl } = event;
    console.log('[WebView Debug] Checking URL:', eventUrl);

    // 개발 환경 확인
    const isDevelopment = __DEV__;

    // 허용할 도메인들 목록
    const allowedDomains = [
      'gitanimals.org',
      'git-animal-webview.vercel.app',
      'vercel.app',
      ...(isDevelopment ? ['localhost', '127.0.0.1', '192.168.', '10.0.2.2'] : []),
    ];

    const isAllowedDomain = allowedDomains.some((domain) => eventUrl.includes(domain));

    if (!isAllowedDomain) {
      console.log('[WebView Debug] External URL detected, opening in browser:', eventUrl);
      Linking.openURL(eventUrl);
      return false;
    }

    console.log('[WebView Debug] Allowed URL, loading in WebView:', eventUrl);
    return true;
  };

  const onMessage = async (event: any) => {
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data);
      console.log('[WebView Debug] Received message:', { type, data });

      if (type === 'navigation') {
        setCanGoBack(data.canGoBack);
      } else if (type === 'GITHUB_LOGIN') {
        await handleGithubLogin();
      } else if (type === 'LOGOUT') {
        console.log('[WebView Debug] Logout request received');
        await logout();
        console.log('[WebView Debug] Logout completed');
      }
    } catch (error) {
      console.log('[WebView Debug] Failed to parse webview message:', error);
    }
  };

  const loginInjectedJavaScript = `
    (function() {
      // GitHub 로그인 버튼을 찾기 위한 선택자들을 추가
      const loginSelectors = [
        '[data-testid="github-login-button"]',
        '[data-testid="login-button"]',
        'button:contains("GitHub")',
        'a:contains("GitHub")'
      ];

      // Logout 버튼을 찾기 위한 선택자들
      const logoutSelectors = [
        'button:contains("logout")',
        '[data-testid="logout-button"]',
        '.logout-button',
        '#logout-button'
      ];

      function addLoginHandler(element) {
        element.addEventListener('click', function(e) {
          e.preventDefault();
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'GITHUB_LOGIN'
          }));
        });
      }

      function addLogoutHandler(element) {
        console.log('[WebView Debug] Adding logout handler to element:', element);
        element.addEventListener('click', function(e) {
          console.log('[WebView Debug] Logout button clicked');
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'LOGOUT'
          }));
        });
      }

      function attachHandlers() {
        // 로그인 버튼 핸들러 추가
        loginSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(addLoginHandler);
        });

        // 로그아웃 버튼 핸들러 추가
        logoutSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(addLogoutHandler);
        });
      }

      // 초기 핸들러 연결
      attachHandlers();

      // 동적으로 추가되는 버튼을 위한 MutationObserver
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            attachHandlers();
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    })();
  `;

  // 토큰이 있을 때 웹뷰로 전달
  useEffect(() => {
    if (token && webViewRef.current) {
      console.log('[WebView Debug] Token received:', token);
      const injectTokenScript = `
        console.log('[WebView Debug] Injecting token script');
        window.postToken("${token}");
      `;
      webViewRef.current.injectJavaScript(injectTokenScript);
    }
  }, [token]);

  const webViewUrl = () => {
    if (token) {
      // 토큰이 있으면 홈페이지로 바로 이동 (인증은 JavaScript로 처리)
      const urlObj = new URL(url);
      urlObj.pathname = '/en_US';
      return urlObj.toString();
    }
    return url;
  };
  console.log('webViewUrl(): ', webViewUrl());

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: webViewUrl() }}
        style={styles.webview}
        onLoadEnd={() => {
          console.log('[WebView Debug] Load ended');
          setLoading(false);
        }}
        onError={(syntheticEvent) => {
          console.log('[WebView Debug] Error occurred:', syntheticEvent.nativeEvent);
          setLoading(false);
        }}
        onLoadStart={() => {
          console.log('[WebView Debug] Load started');
          setLoading(true);
        }}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onMessage={onMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT + loginInjectedJavaScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        allowsBackForwardNavigationGestures={true} // iOS에서 스와이프로 뒤로가기/앞으로가기
        bounces={false}
        contentInsetAdjustmentBehavior="never" // iOS에서 자동 inset 조정 비활성화
        automaticallyAdjustContentInsets={false} // iOS에서 자동 content insets 비활성화
      />
      {loading && (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>GitAnimals 로딩 중...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212429',
  },
  webview: {
    flex: 1,
    backgroundColor: '#212429',
    marginBottom: Platform.OS === 'ios' ? 0 : 0, // 하단 여백 제거
  },
  loadingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212429',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default CustomWebView;
