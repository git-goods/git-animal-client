import { useRef, useState } from 'react';
import { StyleSheet, View, BackHandler, Platform, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { WebViewNavigation } from 'react-native-webview';

interface CustomWebViewProps {
  url: string;
}

export default function CustomWebView({ url }: CustomWebViewProps) {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
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
  }, []);

  const onShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    const { url: eventUrl } = event;
    if (!eventUrl.includes('gitanimals.org')) {
      Linking.openURL(eventUrl);
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        onLoadEnd={() => setLoading(false)}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
