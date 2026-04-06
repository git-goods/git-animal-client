import { ROUTES } from '@/router/constants';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isWebView } from './appEnv';
import { NATIVE_CUSTOM_EVENTS } from '../../constants/app';
import { getCustomEventMessage } from '@/lib/message';
import { authUtils } from '@/utils';
import { setAllInterceptors } from '@/utils/interceptor';

export default function LoginPage() {
  const navigate = useNavigate();

  const redirectUrl = ROUTES.HOME;

  const [searchParams] = useSearchParams();
  const jwtToken = searchParams.get('jwt');

  useEffect(() => {
    if (jwtToken) {
      const token = jwtToken.split(' ')[1];
      setTokenAndNavigate(token);
    }
  }, [jwtToken]);

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
    console.log('isWebView()', isWebView());
    if (isWebView()) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: NATIVE_CUSTOM_EVENTS.GITHUB_LOGIN,
        }),
      );
      return;
    } else {
      const isProduction = process.env.NODE_ENV === 'production';
      console.log('isProduction', isProduction);
      if (isProduction) {
        window.location.href = 'https://api.gitanimals.org/logins/oauth/github/by-redirect-when-success/WEB_VIEW';
      } else {
        window.location.href = 'https://api.gitanimals.org/logins/oauth/github/by-redirect-when-success/LOCAL';
      }
    }
  };

  const setTokenAndNavigate = (token: string) => {
    authUtils.setTokensFromParent(token);
    setAllInterceptors();
    navigate('/');
  };

  useEffect(() => {
    const setLoginCallbackEvent = (event: CustomEvent) => {
      const message = getCustomEventMessage(event);

      const token = message.data.data.token;
      setTokenAndNavigate(token);
    };

    document.addEventListener(NATIVE_CUSTOM_EVENTS.LOGIN_CALLBACK, setLoginCallbackEvent as EventListener);

    return () => {
      document.removeEventListener(NATIVE_CUSTOM_EVENTS.LOGIN_CALLBACK, setLoginCallbackEvent as EventListener);
    };
  }, []);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="/assets/auth/app-background-auth.png"
          alt="background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-[1] flex h-full flex-col items-center justify-between pb-5 pt-[94px]">
          <img src="/assets/auth/logo-login.png" alt="gitanimals" className="ml-11 w-[300px]" />
          <div className="flex w-full flex-col items-center gap-2">
            {isWebView() && (
              <button
                type="button"
                className="flex h-11 w-full max-w-[343px] items-center justify-center gap-1.5 rounded-2xl bg-white px-6 text-[15px] font-semibold leading-[19px]"
                onClick={onClickAppleLogin}
              >
                <AppleLoginIcon />
                Apple로 계속하기
              </button>
            )}

            <button
              type="button"
              className="flex h-11 w-full max-w-[343px] items-center justify-center gap-1.5 rounded-2xl bg-brand-canary px-6 text-[15px] font-semibold leading-[19px]"
              onClick={onClickGithubLogin}
            >
              <GithubLoginIcon />
              GitHub로 계속하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const AppleLoginIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.3201 14.5324C17.0575 15.139 16.7466 15.6975 16.3865 16.2109C15.8956 16.9108 15.4936 17.3953 15.1839 17.6644C14.7037 18.106 14.1892 18.3321 13.6382 18.345C13.2427 18.345 12.7657 18.2324 12.2105 18.0041C11.6535 17.7769 11.1415 17.6644 10.6735 17.6644C10.1826 17.6644 9.65605 17.7769 9.0929 18.0041C8.52888 18.2324 8.07452 18.3514 7.72713 18.3632C7.19881 18.3857 6.6722 18.1531 6.14656 17.6644C5.81107 17.3717 5.39143 16.8701 4.88873 16.1595C4.34937 15.4006 3.90594 14.5206 3.55855 13.5173C3.1865 12.4337 3 11.3843 3 10.3684C3 9.20468 3.25146 8.20099 3.75513 7.3599C4.15097 6.6843 4.67757 6.15137 5.33666 5.76014C5.99575 5.36891 6.7079 5.16955 7.47481 5.15679C7.89445 5.15679 8.44474 5.28659 9.12859 5.5417C9.81051 5.79766 10.2484 5.92746 10.4403 5.92746C10.5839 5.92746 11.0703 5.77568 11.8949 5.4731C12.6746 5.19248 13.3328 5.07629 13.8719 5.12206C15.3329 5.23997 16.4304 5.81588 17.1604 6.85344C15.8538 7.64512 15.2074 8.75396 15.2203 10.1764C15.2321 11.2844 15.634 12.2064 16.424 12.9385C16.782 13.2783 17.1818 13.5409 17.6266 13.7274C17.5302 14.0072 17.4283 14.2751 17.3201 14.5324ZM13.9694 1.34739C13.9694 2.21583 13.6522 3.02668 13.0198 3.7772C12.2566 4.66942 11.3335 5.18498 10.3325 5.10363C10.3198 4.99944 10.3124 4.88979 10.3124 4.77457C10.3124 3.94087 10.6753 3.04865 11.3198 2.31914C11.6416 1.94978 12.0508 1.64266 12.5471 1.39766C13.0423 1.15632 13.5107 1.02286 13.9512 1C13.9641 1.1161 13.9694 1.2322 13.9694 1.34738V1.34739Z"
        fill="black"
      />
    </svg>
  );
};

function GithubLoginIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 98 96">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="#24292f"
      />
    </svg>
  );
}
