import Image from 'next/image';
import { css, cx } from '_panda/css';
import { grid } from '_panda/patterns';

import GNB from '@/components/GNB/GNB';

import { ProfileSection } from './ProfileSection';

async function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={cx(containerStyle)}>
        <GNB />
        <Image src="/mypage/bg-cloud.webp" alt="bg" width={2400} height={1367} className={bgStyle} draggable={false} />
        <main className={mainStyle}>
          <ProfileSection />
          <section className={rightSectionStyle}>{children}</section>
        </main>
      </div>
    </>
  );
}

export default MypageLayout;

const rightSectionStyle = css({
  width: '100%',
  maxW: '1080px',
  borderRadius: 16,
  background: 'white.white_10',
  backdropFilter: 'blur(7px)',
  minHeight: '700px',
  height: 'calc(100vh - 240px)',
  maxHeight: 'min(calc(100vh - 240px), 1000px)',
  overflow: 'hidden',
  p: 40,
  _mobile: {
    background: 'none',
    p: 0,
    maxHeight: 'auto',
    height: 'auto',
    overflowY: 'auto',
    borderRadius: 0,
  },
});

const containerStyle = css({
  minHeight: '100vh',
  height: 'fit-content',
  backgroundColor: '#019C5A',
});

const bgStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 'calc(100% - 86px)',
  zIndex: 0,
  objectFit: 'cover',
  marginTop: '86px',
  pointerEvents: 'none',
});

const mainStyle = grid({
  gap: 80,
  gridTemplateColumns: '222px 1fr',
  position: 'relative',
  zIndex: 1,
  margin: '120px 200px 0',

  '@media (max-width: 1400px)': {
    margin: '120px 100px 0',
  },

  // TODO : 중간 태블릿 정도도 대응하면 좋을 듯

  _mobile: {
    gridTemplateColumns: '1fr',
    margin: '0 16px 0',
    gap: 0,
  },
});
