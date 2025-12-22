import { useEffect } from "react";

import { authUtils } from "@/lib/auth";

export default function LoginPage() {
  const isProduction = import.meta.env.PROD;

  useEffect(() => {
    // URL에서 JWT 토큰 확인
    const params = new URLSearchParams(window.location.search);
    const jwtToken = params.get("jwt");

    if (jwtToken) {
      const token = jwtToken.split(" ")[1];
      setTokenAndNavigate(token);
    }
  }, []);

  const onClickGithubLogin = () => {
    if (isProduction) {
      window.location.href =
        "https://api.gitanimals.org/logins/oauth/github/by-redirect-when-success/ADMIN";
    } else {
      window.location.href =
        "https://api.gitanimals.org/logins/oauth/github/by-redirect-when-success/LOCAL_ADMIN";
    }
  };

  const setTokenAndNavigate = (token: string) => {
    authUtils.setTokensFromParent(token);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-900 flex items-center justify-center p-3">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-6 space-y-6">
          {/* 로고 */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-2xl mx-auto shadow-md">
              D
            </div>
            <h1 className="text-2xl text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-600">관리자 패널</p>
          </div>

          {/* 로그인 버튼 */}
          <div className="space-y-3">
            <button
              onClick={onClickGithubLogin}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md"
            >
              <GithubIcon />
              <span className="text-sm">GitHub로 계속하기</span>
            </button>
          </div>

          {/* 안내 메시지 */}
          <div className="text-center">
            <p className="text-xs text-slate-500">
              GitHub 계정으로 로그인하여 관리자 패널에 접근하세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 98 96">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="currentColor"
      />
    </svg>
  );
}
