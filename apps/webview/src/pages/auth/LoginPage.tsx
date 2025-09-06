import { ROUTES } from '@/router/constants';
import { css } from '_panda/css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isWebView, isAndroid, WINDOW_CUSTOM_EVENT, isIOS } from './appEnv';
import { NATIVE_CUSTOM_EVENTS } from '../../constants/app';
import { getCustomEventMessage } from '@/lib/message';
import { authUtils } from '@/utils';

const initAppleLogin = () => {
  window.AppleID.auth.init({
    scope: 'email',
    state: 'state',
    clientId: process.env.NEXT_PUBLIC_APPLE_LOGIN_CLIENT_ID ?? '',
    redirectURI: process.env.NEXT_PUBLIC_APPLE_LOGIN_REDIRECT_URI ?? '',
    nonce: process.env.NEXT_PUBLIC_SNS_LOGIN_NONCE ?? '',
    usePopup: true,
  });
};

export default function LoginPage() {
  const navigate = useNavigate();
  // const { mutateAsync: socialLoginAsyncMutate } = useSocialLogin();
  // const { mutate: updateMemberFcmTokenMutate } = useUpdateMemberFcmToken();
  // const { redirect } = router.query;
  // const redirectUrl = redirect ?? ROUTES.HOME;

  const redirectUrl = ROUTES.HOME;

  const onClickAppleLogin = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: NATIVE_CUSTOM_EVENTS.APPLE_LOGIN,
      }),
    );

    // if (isWebView()) {
    //   window.ReactNativeWebView?.postMessage(
    //     JSON.stringify({
    //       type: NATIVE_CUSTOM_EVENTS.APPLE_LOGIN,
    //     }),
    //   );
    //   return;
    // }
    // window.AppleID.auth.signIn();
  };

  useEffect(() => {
    const nativeLoginCallbackEventListener = (event: CustomEvent) => {
      const message = getCustomEventMessage(event);
      console.log('nativeLoginCallbackEventListener', event);
      console.log('event.detail:', message);

      const token = message.data.data.token;
      authUtils.setTokensFromParent(token);
      navigate('/');

      alert('event.detail: ' + JSON.stringify(message));
    };

    document.addEventListener(
      NATIVE_CUSTOM_EVENTS.APPLE_LOGIN_CALLBACK,
      nativeLoginCallbackEventListener as EventListener,
    );

    return () => {
      document.removeEventListener(
        NATIVE_CUSTOM_EVENTS.APPLE_LOGIN_CALLBACK,
        nativeLoginCallbackEventListener as EventListener,
      );
    };
  }, []);

  return (
    <>
      {/* <Helmet>
     <script
      src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
      type="text/javascript"
      onLoad={
        () => {
          window.AppleID.auth.init({
            scope: 'email',
            state: 'state',
            clientId: process.env.NEXT_PUBLIC_APPLE_LOGIN_CLIENT_ID ?? '',
            redirectURI: process.env.NEXT_PUBLIC_APPLE_LOGIN_REDIRECT_URI ?? '',
            nonce: process.env.NEXT_PUBLIC_SNS_LOGIN_NONCE ?? '',
            usePopup: true,
          });
        }
      }
    ></script>
      </Helmet> */}

      {/* <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        type="text/javascript"
        onLoad={initAppleLogin}
      /> */}

      <div className={MainWrapperCss}>
        <div className={LoginButtonListWrapperCss}>
          <button type={'button'} className={AppleLoginButtonCss} onClick={onClickAppleLogin}>
            {/* <Icon name="apple-login" /> */}
            Apple로 계속하기
          </button>
          {/* <ButtonSocialLogin type="kakao" onClick={onClickKakaoLogin} /> */}
          {/* <Button
              type="button"
              size="large"
              variant="ghost"
              onClick={onClickGuest}
              className={css({ color: 'text.primary' })}
            >
              둘러보기
            </Button> */}
        </div>
      </div>
    </>
  );
}

const MainWrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',

  width: '100%',
  height: '100vh',
  paddingBottom: '16px',
});

const LoginButtonListWrapperCss = css({
  maxWidth: '320px',
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
});

const AppleLoginButtonCss = css({
  width: '100%',
  maxWidth: '343px',
  height: '44px',
  padding: '0 24px',
  borderRadius: '16px',
  textStyle: 'subtitle4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  border: '1px solid',
  borderColor: 'gray.200',
  color: 'gray.900',
  backgroundColor: 'white',
});
