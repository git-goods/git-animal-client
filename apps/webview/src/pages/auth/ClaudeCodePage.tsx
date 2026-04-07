import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authUtils } from '@/utils';
import { useUser } from '@/hooks/useUser';
import { ROUTES } from '@/router/constants';

export default function ClaudeCodePage() {
  const [copied, setCopied] = useState(false);
  const isAuthenticated = authUtils.isAuthenticated();
  const user = useUser();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} replace state={{ from: { pathname: '/auth/claude-code' } }} />;
  }

  const command = `/gitanimals-buddy:login ${user.username}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 p-8">
      <div className="w-full max-w-[480px] rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <span className="text-5xl leading-none">🐾</span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Claude Code 연동</h1>
        </div>

        <p className="mb-2 text-center text-gray-600">
          당신의 username은
        </p>
        <p className="mb-6 text-center text-xl font-bold text-gray-900">{user.username}</p>

        <p className="mb-3 text-sm text-gray-500">아래 명령어를 Claude Code 터미널에 입력하세요:</p>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <code className="flex-1 text-sm font-mono text-gray-800">{command}</code>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-md bg-brand-canary px-3 py-1.5 text-sm font-semibold transition-opacity hover:opacity-80 active:opacity-60"
          >
            {copied ? '복사됨 ✓' : '복사'}
          </button>
        </div>
      </div>
    </div>
  );
}
