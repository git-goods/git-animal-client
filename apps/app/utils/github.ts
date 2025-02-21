import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';

export const checkGithubAppInstalled = async () => {
  try {
    const supported = await Linking.canOpenURL('github://');
    console.log('supported: ', supported);
    return supported;
  } catch (err) {
    return false;
  }
};

export const getGithubOauthUrl = async () => {
  try {
    // 먼저 내부 API를 호출하여 OAuth URL을 가져옵니다
    // const internalResponse = await fetch('https://www.gitanimals.org/api/oauth');
    // console.log('internalResponse: ', internalResponse);

    // if (!internalResponse.ok) {
    //   throw new Error(`Internal API error! status: ${internalResponse.status}`);
    // }

    // const internalData = await internalResponse.json();
    // console.log('Internal API response:', internalData);

    // 직접 백엔드 API를 호출합니다
    const response = await fetch('https://api.gitanimals.org/logins/oauth/github', {
      headers: {
        Platform: 'WEB',
        'Redirect-When-Success': 'LOCAL',
        // 'Content-Type': 'application/json',
        // Accept: 'application/json',
      },
    });

    console.log('response: ', response.ok);

    if (!response.ok) {
      console.error('Response status:', response.status);
      console.error('Response headers:', response.headers);
      const text = await response.text();
      console.log('Response text:', text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // const data = await response.json();
    console.log('response: ', response);
    console.log('response.url: ', response.url);

    const url = response.url;
    if (!url) {
      throw new Error('OAuth URL이 없습니다');
    }
    return url;
  } catch (error) {
    console.error('Failed to get OAuth URL:', error);
    throw error;
  }
};

export const handleGithubLogin = async () => {
  try {
    const hasGithubApp = await checkGithubAppInstalled();
    const oauthUrl = await getGithubOauthUrl();

    console.log('oauthUrl: ', oauthUrl);

    if (hasGithubApp) {
      await Linking.openURL(oauthUrl);
    } else {
      // 콜백 URL을 명시적으로 설정
      const callbackUrl = Linking.createURL('auth/callback');
      console.log('Callback URL:', callbackUrl);

      const result = await WebBrowser.openAuthSessionAsync(oauthUrl, callbackUrl, {
        showInRecents: true,
        showTitle: true,
        enableDefaultShareMenuItem: false,
        // prefersEphemeralWebBrowserSession: true,
      });

      console.log('WebBrowser result:', result);

      if (result.type === 'success' && result.url) {
        console.log('Success URL:', result.url);
        const url = new URL(result.url);
        const token = url.searchParams.get('token');
        if (token) {
          await SecureStore.setItemAsync('auth_token', token);
          return token;
        }
      } else {
        throw new Error('인증이 취소되었거나 실패했습니다');
      }
    }
  } catch (error) {
    console.error('Login failed:', error);
    if (error instanceof Error) {
      throw new Error(`로그인 실패: ${error.message}`);
    }
    throw new Error('알 수 없는 로그인 오류가 발생했습니다');
  }
};
