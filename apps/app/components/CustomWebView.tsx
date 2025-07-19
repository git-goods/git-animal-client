import { useRef, useState } from 'react';
import { StyleSheet, View, BackHandler, Platform, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { WebViewNavigation } from 'react-native-webview';

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

export default function CustomWebView({ url }: CustomWebViewProps) {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

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

  const onMessage = (event: any) => {
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data);
      if (type === 'navigation') {
        setCanGoBack(data.canGoBack);
      }
    } catch (error) {
      console.log('Failed to parse webview message', error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        onLoadEnd={() => setLoading(false)}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onMessage={onMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        allowsBackForwardNavigationGestures={true} // iOS에서 스와이프로 뒤로가기/앞으로가기
        bounces={false}
      />
      {loading && <View style={styles.loadingView} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  webview: {
    flex: 1,
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
