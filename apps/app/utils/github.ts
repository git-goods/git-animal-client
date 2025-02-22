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
    const redirectUrl = 'gitanimals://auth';
    console.log('Redirect URL:', redirectUrl);

    console.log('Sending request with headers:', {
      'Redirect-When-Success': 'APP',
      'X-Mobile-Redirect': redirectUrl,
    });

    const response = await fetch('https://api.gitanimals.org/logins/oauth/github', {
      headers: {
        'Redirect-When-Success': 'APP',
        'X-Mobile-Redirect': redirectUrl,
      },
    });

    console.log('Response:', {
      ok: response.ok,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      url: response.url,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const url = response.url;
    console.log('OAuth URL:', url);

    if (!url) {
      throw new Error('OAuth URL이 없습니다');
    }
    return url;
  } catch (error) {
    console.error('Failed to get OAuth URL:', error);
    throw error;
  }
};

export const handleGithubLogin = async (): Promise<string | undefined> => {
  try {
    const oauthUrl = await getGithubOauthUrl();
    console.log('Opening OAuth URL:', oauthUrl);

    await WebBrowser.warmUpAsync();
    console.log('WebBrowser warmed up');

    return new Promise((resolve, reject) => {
      console.log('Setting up URL listener');

      const subscription = Linking.addEventListener('url', ({ url }) => {
        console.log('Received URL in listener:', url);
        console.log('URL includes "auth":', url.includes('auth'));

        if (url.includes('auth')) {
          console.log('Auth URL detected, cleaning up...');
          subscription.remove();
          WebBrowser.coolDownAsync();
          resolve('success');
        }
      });

      const redirectUrl = 'gitanimals://auth';
      console.log('Opening auth session with:', {
        oauthUrl,
        redirectUrl,
      });

      WebBrowser.openAuthSessionAsync(oauthUrl, redirectUrl, {
        showInRecents: true,
        showTitle: true,
        enableDefaultShareMenuItem: false,
        preferEphemeralSession: false,
      })
        .then(async (result) => {
          console.log('result: ', result);
          console.log('WebBrowser result:', {
            type: result.type,
            fullResult: JSON.stringify(result, null, 2),
          });
          subscription.remove();
          WebBrowser.coolDownAsync();

          if (result.type === 'success') {
            console.log('Auth successful, checking URL parameters...');
            try {
              const url = new URL(result.url || '');
              console.log('Success URL parsed:', {
                pathname: url.pathname,
                search: url.search,
                hash: url.hash,
                params: Object.fromEntries(url.searchParams.entries()),
              });
              const params = Object.fromEntries(url.searchParams.entries());

              await SecureStore.setItemAsync('auth_token', params.jwt || '');
            } catch (e) {
              console.log('Could not parse success URL:', e);
            }
            resolve('success');
          } else if (result.type === 'cancel') {
            console.log('Auth was cancelled by user');
            reject(new Error('인증이 취소되었습니다'));
          } else {
            console.log('Auth failed with type:', result.type);
            reject(new Error('인증에 실패했습니다'));
          }
        })
        .catch((error) => {
          console.error('WebBrowser error:', error);
          subscription.remove();
          WebBrowser.coolDownAsync();
          reject(error);
        });

      setTimeout(() => {
        console.log('Login timeout reached');
        subscription.remove();
        WebBrowser.coolDownAsync();
        reject(new Error('로그인 시간이 초과되었습니다'));
      }, 300000);
    });
  } catch (error) {
    console.error('Login failed:', error);
    await WebBrowser.coolDownAsync();
    if (error instanceof Error) {
      throw new Error(`로그인 실패: ${error.message}`);
    }
    throw new Error('알 수 없는 로그인 오류가 발생했습니다');
  }
};
