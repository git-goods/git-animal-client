export const NATIVE_CUSTOM_EVENTS = {
  APPLE_LOGIN: 'appleLogin',
  APPLE_LOGIN_CALLBACK: 'appleLoginCallback',
  VIBRATE: 'vibrate',
  HAPTIC: 'haptic',
  FOREGROUND_FCM: 'foregroundFcm',
  GITHUB_LOGIN: 'githubLogin',
  GITHUB_LOGIN_CALLBACK: 'githubLoginCallback',
} as const;

// window.ReactNativeWebView?.postMessage(
//     JSON.stringify({
//       type: NATIVE_CUSTOM_EVENTS.KAKAO_LOGIN,
//     }),
//   );

// const nativeLoginCallbackEventListener = (event: CustomEvent) => {
//     socialLoginAsyncMutate(
//       {
//         provider: event.detail.data.provider,
//         idToken: event.detail.data.data,
//       },
//       {
//         onSuccess: (data) => {
//           if (data?.memberId) {
//             eventLogger.identify(data.memberId.toString());
//           }

//           if (!!event.detail?.data?.deviceToken) {
//             updateMemberFcmTokenMutate({ fcmToken: event.detail.data.deviceToken });
//           }
//           // 지금 당장은 필요없지만 나중을 위해 작동하도록 한다

//           if (data.landingStatus === 'TO_ONBOARDING') {
//             eventLogger.logEvent(EVENT_LOG_CATEGORY.ONBOARDING, EVENT_LOG_NAME.ONBOARDING.SUCCESS_SIGNUP);
//             router.push(ROUTER.ONBOARDING.HOME);
//             return;
//           }
//           router.push(redirectUrl.toString());
//         },
//         onError: () => {
//           window.Kakao.Auth.authorize({
//             redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI,
//             nonce: process.env.NEXT_PUBLIC_SNS_LOGIN_NONCE,
//             throughTalk: false,
//           });
//         },
//       },
//     );
//   };

//   document.addEventListener(
//     NATIVE_CUSTOM_EVENTS.KAKAO_LOGIN_CALLBACK,
//     nativeLoginCallbackEventListener as EventListener,
//   );

//   return () => {
//     document.removeEventListener(
//       NATIVE_CUSTOM_EVENTS.KAKAO_LOGIN_CALLBACK,
//       nativeLoginCallbackEventListener as EventListener,
//     );
//   };
// }, []);
