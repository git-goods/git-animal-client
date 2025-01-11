import type { ReactNode } from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';

export default function GuildDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutStyle}>
      <div className={contentStyle}>{children}</div>
    </div>
  );
}

const layoutStyle = css({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
  minHeight: 'calc(100vh - 60px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const contentStyle = flex({
  width: '100%',
  flexDirection: 'column',
  bg: 'gray.gray_150',
  padding: '60px 100px',
  height: 'fit-content',
  gap: 8,
  overflowY: 'auto',
  borderRadius: '16px',
});
