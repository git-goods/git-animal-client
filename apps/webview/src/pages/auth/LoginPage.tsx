import { ROUTES } from '@/router/constants';
import { css } from '_panda/css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isWebView } from './appEnv';
import { NATIVE_CUSTOM_EVENTS } from '../../constants/app';
import { getCustomEventMessage } from '@/lib/message';
import { authUtils } from '@/utils';
import { Button } from '@gitanimals/ui-panda';
import { setAllInterceptors } from '@/utils/interceptor';

export default function LoginPage() {
  const navigate = useNavigate();
  const redirectUrl = ROUTES.HOME;

  const onClickAppleLogin = () => {
    if (isWebView()) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: NATIVE_CUSTOM_EVENTS.APPLE_LOGIN,
        }),
      );
      return;
    }
  };

  const onClickGithubLogin = () => {
    if (isWebView()) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: NATIVE_CUSTOM_EVENTS.GITHUB_LOGIN,
        }),
      );
      return;
    }
  };

  useEffect(() => {
    const setTokenAndNavigate = (event: CustomEvent) => {
      const message = getCustomEventMessage(event);

      const token = message.data.data.token;
      authUtils.setTokensFromParent(token);

      setAllInterceptors();

      navigate('/');
      // window.location.href = '/';
    };

    document.addEventListener(NATIVE_CUSTOM_EVENTS.LOGIN_CALLBACK, setTokenAndNavigate as EventListener);

    return () => {
      document.removeEventListener(NATIVE_CUSTOM_EVENTS.LOGIN_CALLBACK, setTokenAndNavigate as EventListener);
    };
  }, []);

  return (
    <>
      <div className={MainWrapperCss}>
        <Button onClick={onClickAppleLogin}>Apple로 계속하기</Button>
        <Button onClick={onClickGithubLogin}>GitHub로 계속하기</Button>
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
  paddingBottom: '100px',
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
