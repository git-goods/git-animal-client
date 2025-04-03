import { useRef, useState } from 'react';
import { StyleSheet, View, BackHandler, Platform, Linking, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { WebViewNavigation } from 'react-native-webview';
import { handleGithubLogin } from '../utils/github';
import { usePathname, useRouter } from 'expo-router';

interface CustomWebViewProps {
  url: string;
}

// 웹뷰에서 history 스택을 관리하기 위한 자바스크립트 코드
const INJECTED_JAVASCRIPT = `
(function() {
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
})();
true;
`;

const CustomWebView: React.FC<CustomWebViewProps> = ({ url }) => {
  const router = useRouter();
  const pathname = usePathname();
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  // URL 경로를 앱 경로로 변환하는 함수
  const getAppPath = (webUrl: string) => {
    try {
      const urlObj = new URL(webUrl);
      // locale 패턴 제거 (/en_US, /ko_KR 등)
      const path = urlObj.pathname.replace(/^\/[a-z]{2}_[A-Z]{2}/, '');

      // 타입에 맞는 경로 반환
      switch (path) {
        case '/':
          return '/(tabs)' as const;
        // case '/profile':
        //   return '/(tabs)/profile' as const;
        default:
          return '/(tabs)' as const;
      }
    } catch (e) {
      return '/(tabs)' as const;
    }
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    // 웹뷰 상태 업데이트
    setCanGoBack(navState.canGoBack);

    // URL이 gitanimals.org 도메인인 경우에만 경로 동기화
    if (navState.url.includes('gitanimals.org')) {
      const appPath = getAppPath(navState.url);
      console.log('Syncing path:', { webUrl: navState.url, appPath });

      // 현재 앱 경로와 다른 경우에만 업데이트
      if (appPath !== pathname) {
        router.replace(appPath);
      }
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
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
      };
    }
  }, [canGoBack]);

  const onShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    const { url: eventUrl } = event;
    if (!eventUrl.includes('gitanimals.org')) {
      Linking.openURL(eventUrl);
      return false;
    }
    return true;
  };

  const onMessage = async (event: any) => {
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data);
      if (type === 'navigation') {
        setCanGoBack(data.canGoBack);
      } else if (type === 'GITHUB_LOGIN') {
        await handleGithubLogin();
      }
    } catch (error) {
      console.log('Failed to parse webview message', error);
    }
  };

  const loginInjectedJavaScript = `
    (function() {
      // GitHub 로그인 버튼을 찾기 위한 선택자들을 추가
      const selectors = [
        '[data-testid="github-login-button"]',
        '[data-testid="login-button"]',
        'button:contains("GitHub")',
        'a:contains("GitHub")'
      ];

      function addLoginHandler(element) {
        element.addEventListener('click', function(e) {
          e.preventDefault();
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'GITHUB_LOGIN'
          }));
        });
      }

      // 모든 선택자를 시도
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(addLoginHandler);
      });

      // 동적으로 추가되는 버튼을 위한 MutationObserver
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            selectors.forEach(selector => {
              const elements = document.querySelectorAll(selector);
              elements.forEach(addLoginHandler);
            });
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    })();
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        onLoadEnd={() => setLoading(false)}
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
      />
      {loading && (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default CustomWebView;
