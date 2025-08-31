/**
 * GitHub OAuth URL을 가져오고 해당 URL로 리다이렉트합니다.
 * Vite proxy를 통해 외부 API에 연결됩니다.
 * WebView 환경에서 사용됩니다.
 */
export const getGithubOauthUrl = async () => {
  try {
    // const res = await fetch('https://api.gitanimals.org/logins/oauth/github', {
    //   headers: {
    //     'Redirect-When-Success': process.env.NODE_ENV === 'production' ? 'HOME' : 'LOCAL',
    //   },
    // });
    const res = await fetch('/api/logins/oauth/github', {
      headers: {
        'Redirect-When-Success': process.env.NODE_ENV === 'production' ? 'HOME' : 'LOCAL',
      },
    });
    console.log('res: ', res);
    const data = await res.json();

    console.log('data: ', data);

    window.location.assign(data.url);

    // // WebView 환경에서는 부모 앱에 OAuth URL 전송
    // if (window.ReactNativeWebView) {
    //   window.ReactNativeWebView.postMessage(
    //     JSON.stringify({
    //       type: 'OAUTH_REQUEST',
    //       url: data.url,
    //       message: 'GitHub OAuth requested',
    //     }),
    //   );
    // } else {
    //   // 일반 웹 환경에서는 직접 리다이렉트
    //   window.location.assign(data.url);
    // }
  } catch (error) {
    console.error('Failed to get GitHub OAuth URL:', error);
    throw error;
  }
};
