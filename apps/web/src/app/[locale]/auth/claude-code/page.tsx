'use client';

import { signIn } from 'next-auth/react';
import { cn, TextField } from '@gitanimals/ui-tailwind';

import { useClientSession, useClientUser } from '@/shared/utils/clientAuth';

export default function ClaudeCodePage() {
  const { status } = useClientSession();
  const user = useClientUser();

  if (status === 'loading') {
    return (
      <div className={pageRootStyle}>
        <p className="text-xl text-white/70">로딩 중…</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    signIn(undefined, { callbackUrl: '/auth/claude-code' });
    return null;
  }

  const username = user.name ?? '';
  const command = `/gitanimals-buddy:login ${username}`;

  return (
    <div className={pageRootStyle}>
      <div className={cardStyle}>
        <div className="text-center flex flex-col items-center gap-6">
          <p className="text-[82px] font-bold leading-none text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-paw-print-icon lucide-paw-print"
            >
              <circle cx="11" cy="4" r="2" />
              <circle cx="18" cy="8" r="2" />
              <circle cx="20" cy="16" r="2" />
              <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
            </svg>
          </p>
          <h1 className="text-[28px] font-bold text-white max-md:text-2xl">Claude Code 연동</h1>
        </div>

        <div className="text-center">
          <p className="text-xl text-white/80">당신의 username은</p>
          <p className="text-[28px] font-bold text-white mt-1 max-md:text-2xl">{username}</p>
        </div>

        <div className="w-full text-center">
          <p className="text-sm text-white/70 mb-3">아래 명령어를 Claude Code 터미널에 입력하세요</p>
          <TextField readOnly value={command} />
        </div>
      </div>
    </div>
  );
}

const pageRootStyle = cn(
  'flex flex-col items-center justify-center min-h-screen p-6 text-white max-md:p-4',
  'bg-gradient-to-b from-black via-[#005B93] to-[#0187DB]',
);

const cardStyle = cn(
  'rounded-2xl bg-white/10 backdrop-blur-[7px] p-10 w-fit min-w-[520px] max-w-full',
  'flex flex-col items-center gap-6',
  'max-md:min-w-full max-md:px-4 max-md:py-6 max-md:bg-white/[0.08]',
);
