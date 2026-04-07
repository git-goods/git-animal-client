'use client';

import { signIn } from 'next-auth/react';
import { css } from '_panda/css';
import { TextField } from '@gitanimals/ui-panda';

import { useClientSession, useClientUser } from '@/utils/clientAuth';

export default function ClaudeCodePage() {
  const { status } = useClientSession();
  const user = useClientUser();

  if (status === 'loading') {
    return (
      <div className={pageRootCss}>
        <p className={loadingTextCss}>로딩 중…</p>
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
    <div className={pageRootCss}>
      <div className={cardCss}>
        <div className={headerBlockCss}>
          <p className={emojiCss}>🐾</p>
          <h1 className={titleCss}>Claude Code 연동</h1>
        </div>

        <div className={usernameBlockCss}>
          <p className={mutedLabelCss}>당신의 username은</p>
          <p className={usernameValueCss}>{username}</p>
        </div>

        <div className={commandBlockCss}>
          <p className={commandHintCss}>아래 명령어를 Claude Code 터미널에 입력하세요</p>
          <TextField readOnly value={command} />
        </div>
      </div>
    </div>
  );
}

/** 상점 Auction 섹션과 동일 그라데이션 */
const pageRootCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '24px',
  bg: 'linear-gradient(180deg, #000 0%, #004875 38.51%, #005B93 52.46%, #006FB3 73.8%, #0187DB 100%)',

  _mobile: {
    padding: '16px',
  },
});

const loadingTextCss = css({
  textStyle: 'glyph20.regular',
  color: 'white.white_70',
});

const cardCss = css({
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(7px)',
  padding: '40px',
  width: 'fit-content',
  minWidth: '520px',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',

  _mobile: {
    minWidth: '100%',
    padding: '24px 16px',
    background: 'rgba(255, 255, 255, 0.08)',
  },
});

const headerBlockCss = css({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
});

const emojiCss = css({
  textStyle: 'glyph82.bold',
  lineHeight: '1',
});

const titleCss = css({
  textStyle: 'glyph28.bold',
  color: 'white',

  _mobile: {
    textStyle: 'glyph24.bold',
  },
});

const usernameBlockCss = css({
  textAlign: 'center',
});

const mutedLabelCss = css({
  textStyle: 'glyph20.regular',
  color: 'white.white_80',
});

const usernameValueCss = css({
  textStyle: 'glyph28.bold',
  color: 'white',
  marginTop: '4px',

  _mobile: {
    textStyle: 'glyph24.bold',
  },
});

const commandBlockCss = css({
  width: '100%',
  textAlign: 'center',
});

const commandHintCss = css({
  textStyle: 'glyph14.regular',
  color: 'white.white_70',
  marginBottom: '12px',
});
