'use client';

import { useEffect } from 'react';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { isDev } from '@/constants/env';
import { GITHUB_ISSUE_URL } from '@/constants/outlink';
import { isTokenExpiredError } from '@/utils/sessionExpired';

// layout 에서 새는 에러를 받는다 — error.tsx 는 page 만 감싼다 (gitanimals#506).
// 루트 레이아웃을 대체하므로 <html>/<body> 를 직접 그려야 하고 globals.css 도 적용되지 않는다.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (isDev) return;
    // 세션 만료는 장애가 아니다. 만료된 사용자 수만큼 <!here> 가 울린다.
    if (isTokenExpiredError(error)) return;

    sendMessageToErrorChannel(`<!here>
🔥 Global Error (root) 발생 🔥
Error Message: ${error.message}
Digest: ${error.digest ?? '-'}
\`\`\`
${error.stack}
\`\`\`
URL: ${window.location.href}
`);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            padding: 24,
            background: '#111827',
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Something went wrong 😭</h1>
          <p style={{ margin: 0, opacity: 0.75, lineHeight: 1.6 }}>
            문제가 계속되면 로그아웃 후 다시 로그인해 주세요.
            <br />
            It may help to sign out and sign in again.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button type="button" onClick={reset} style={buttonStyle}>
              Retry
            </button>
            <a href="/api/auth/signout" style={buttonStyle}>
              Sign out
            </a>
            <a href={GITHUB_ISSUE_URL} target="_blank" rel="noreferrer" style={buttonStyle}>
              Report
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.25)',
  background: 'transparent',
  color: '#fff',
  font: 'inherit',
  fontSize: 15,
  cursor: 'pointer',
  textDecoration: 'none',
} as const;
