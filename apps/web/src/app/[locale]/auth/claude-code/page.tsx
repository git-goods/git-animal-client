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
      <div className="flex min-h-screen items-center justify-center bg-brand-primary">
        <span className="text-white/70">Loading...</span>
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-brand-primary px-6">
      <div className="text-center">
        <p className="text-5xl leading-none">🐾</p>
        <h1 className="mt-6 text-4xl font-bold text-white">Claude Code 연동</h1>
      </div>

      <div className="text-center">
        <p className="text-lg text-white/80">당신의 username은</p>
        <p className="mt-1 text-3xl font-bold text-white">{username}</p>
      </div>

      <div className="w-full max-w-[520px]">
        <p className="mb-3 text-sm text-white/70">아래 명령어를 Claude Code 터미널에 입력하세요:</p>
        <div className="flex items-center gap-3 rounded-2xl border-2 border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm">
          <code className="flex-1 font-mono text-sm text-white">{command}</code>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-xl border-2 border-brand-canary bg-brand-canary px-4 py-2 text-sm font-bold text-black transition-opacity hover:opacity-80 active:opacity-60"
          >
            {copied ? '복사됨 ✓' : '복사'}
          </button>
        </div>
      </div>
    </div>
  );
}
