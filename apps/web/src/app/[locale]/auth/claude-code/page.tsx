'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { TextField } from '@gitanimals/ui-tailwind';

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
      <div className="w-fit h-fit bg-white-10 rounded-lg p-6 flex flex-col items-center justify-center gap-6 min-w-[520px] px-10">
        <div className="text-center">
          <p className="text-glyph-82 font-[64px] leading-none">🐾</p>
          <h1 className="mt-6 text-glyph-28 font-bold text-white">Claude Code 연동</h1>
        </div>

        <div className="text-center">
          <p className="text-glyph-20 text-white/80">당신의 username은</p>
          <p className="mt-1 text-glyph-28 font-bold text-white">{username}</p>
        </div>

        <div className="w-full ">
          <p className="mb-3 text-glyph-14 text-white/70">아래 명령어를 Claude Code 터미널에 입력하세요</p>
          <TextField readOnly value={command} className="text-glyph-14 w-full" />
        </div>
      </div>
    </div>
  );
}
