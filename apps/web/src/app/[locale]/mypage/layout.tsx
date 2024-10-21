import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { css, cx } from '_panda/css';
import { center, grid } from '_panda/patterns';

import GNB from '@/components/GNB/GNB';

import { ProfileSection } from './ProfileSection';

async function MypageLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('Mypage');

  return (
    <>
      <div className={cx(containerStyle, subStyle)}>
        <GNB />
        <Image src="/mypage/bg-cloud.webp" alt="bg" width={2400} height={1367} className={bgStyle} draggable={false} />
        <main className={mainStyle}>
          <ProfileSection />
          <section className={rightSectionStyle}>{children}</section>
        </main>
      </div>
      <div className={noticeStyle}>{t('no-mobile-support')}</div>
    </>
  );
}

export default MypageLayout;

const subStyle = css({
  '@media (max-width: 1100px)': {
    display: 'none',
  },
});

const noticeStyle = center({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: '#454545',
  color: 'white',
  zIndex: 1000,
  display: 'none',
  textStyle: 'glyph24.bold',
  lineHeight: '1.5',
  textAlign: 'center',
  '@media (max-width: 1100px)': {
    display: 'flex',
  },
});

const rightSectionStyle = css({
  width: '100%',
  maxW: 'min(1080px, calc(100vw - 400px - 222px - 80px ))',
  borderRadius: 16,
  background: 'white.white_10',
  backdropFilter: 'blur(7px)',
  minHeight: '700px',
  height: 'calc(100vh - 240px)',
  maxHeight: 'calc(100vh - 240px)',
  overflow: 'hidden',
  p: 40,
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
});
