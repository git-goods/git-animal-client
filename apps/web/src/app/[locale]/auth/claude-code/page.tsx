'use client';

import { signIn } from 'next-auth/react';
import { TextField } from '@gitanimals/ui-tailwind';

import { useClientSession, useClientUser } from '@/hooks/clientAuth';

/** 상점 Auction 섹션과 동일 그라데이션 */
const pageRootClass =
  'flex min-h-screen flex-col items-center justify-center p-[24px] text-white bg-[linear-gradient(180deg,#000_0%,#004875_38.51%,#005B93_52.46%,#006FB3_73.8%,#0187DB_100%)] mobile:p-[16px]';
const cardClass =
  'flex w-fit min-w-[520px] max-w-full flex-col items-center gap-[24px] rounded-[16px] bg-white-10 p-[40px] backdrop-blur-[7px] mobile:min-w-full mobile:bg-[rgba(255,255,255,0.08)] mobile:px-[16px] mobile:py-[24px]';

export default function ClaudeCodePage() {
  const { status } = useClientSession();
  const user = useClientUser();

  if (status === 'loading') {
    return (
      <div className={pageRootClass}>
        <p className="glyph20-regular text-white">로딩 중…</p>
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
    <div className={pageRootClass}>
      <div className={cardClass}>
        <div className="flex flex-col items-center gap-[24px] text-center">
          <p className="glyph82-bold leading-[1] text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-paw-print-icon lucide-paw-print"
            >
              <circle cx="11" cy="4" r="2" />
              <circle cx="18" cy="8" r="2" />
              <circle cx="20" cy="16" r="2" />
              <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
            </svg>
          </p>
          <h1 className="glyph28-bold text-white mobile:glyph24-bold">Claude Code 연동</h1>
        </div>

        <div className="text-center">
          <p className="glyph20-regular text-white">당신의 username은</p>
          <p className="glyph28-bold mt-[4px] text-white mobile:glyph24-bold">{username}</p>
        </div>

        <div className="w-full text-center">
          <p className="glyph14-regular mb-[12px] text-white">
            아래 명령어를 Claude Code 터미널에 입력하세요
          </p>
          <TextField readOnly value={command} />
        </div>
      </div>
    </div>
  );
}
