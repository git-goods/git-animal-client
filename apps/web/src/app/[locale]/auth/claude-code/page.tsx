'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useClientSession, useClientUser } from '@/shared/utils/clientAuth';

export default function ClaudeCodePage() {
  const [copied, setCopied] = useState(false);
  const { status } = useClientSession();
  const user = useClientUser();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    signIn(undefined, { callbackUrl: '/auth/claude-code' });
    return null;
  }

  const username = user.name ?? '';
  const command = `/gitanimals-buddy:login ${username}`;

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

        <p className="mb-2 text-center text-gray-600">당신의 username은</p>
        <p className="mb-6 text-center text-xl font-bold text-gray-900">{username}</p>

        <p className="mb-3 text-sm text-gray-500">아래 명령어를 Claude Code 터미널에 입력하세요:</p>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <code className="flex-1 font-mono text-sm text-gray-800">{command}</code>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-md bg-yellow-300 px-3 py-1.5 text-sm font-semibold transition-opacity hover:opacity-80 active:opacity-60"
          >
            {copied ? '복사됨 ✓' : '복사'}
          </button>
        </div>
      </div>
    </div>
  );
}
