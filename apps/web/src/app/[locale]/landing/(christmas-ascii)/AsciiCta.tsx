'use client';

import { RenderLoginButton } from '@/components/AuthButton';
import { Link } from '@/i18n/routing';

import { asciiBox, cellWidth } from './layout';

// 한글은 폴백 폰트로 그려져 폭이 정확히 2칸이 아니라서, 라벨 칸 폭을 ch 로 고정해 테두리를 맞춘다
function AsciiBox({ label }: { label: string }) {
  const [top, , bottom] = asciiBox(label).split('\n');
  return (
    <pre className={boxClass}>
      {top}
      {'\n|   '}
      <span className="inline-block text-center" style={{ width: `${cellWidth(label)}ch` }}>
        {label}
      </span>
      {'   |\n'}
      {bottom}
    </pre>
  );
}

const boxClass =
  'pointer-events-auto m-0 whitespace-pre font-[inherit] text-[18px] leading-[1.25] text-brand-canary [text-shadow:0_0_8px_rgba(252,253,156,0.5)] transition-colors hover:bg-brand-canary hover:text-black hover:[text-shadow:none] mobile:text-[clamp(12px,3.4vw,16px)]';

export function AsciiCta({ isAuth, label }: { isAuth: boolean; label: string }) {
  if (isAuth) {
    return (
      <Link href="/mypage" className="pointer-events-auto">
        <AsciiBox label={label} />
      </Link>
    );
  }
  return (
    <RenderLoginButton
      render={({ onClick }) => (
        <button type="button" onClick={onClick} className="pointer-events-auto">
          <AsciiBox label={label} />
        </button>
      )}
    />
  );
}
