import { css } from '_panda/css';
import { grid } from '_panda/patterns';

import GNB from '@/components/GNB/GNB';

import { ProfileSection } from './ProfileSection';

async function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={containerStyle}>
      <GNB />
      <div className={mainStyle}>
        <ProfileSection />
        <div className={rightSectionStyle}>{children}</div>
      </div>
    </div>
  );
}

export default MypageLayout;

const mainStyle = grid({
  gap: 80,
  gridTemplateColumns: '222px 1fr',
  position: 'relative',
  zIndex: 1,
  padding: '120px 200px',

  '@media (max-width: 1400px)': {
    padding: '120px 100px',
  },

  // TODO : 중간 태블릿 정도도 대응하면 좋을 듯
  _mobile: {
    gridTemplateColumns: '1fr',
    padding: '0 16px 0',
    gap: 0,
  },
});

const rightSectionStyle = css({
  // height: 'calc(100vh - 240px)',
  // overflow: 'hidden',
  overflowX: 'hidden',
  width: '100%',
  borderRadius: 16,
  background: 'white.white_10',
  backdropFilter: 'blur(7px)',
  maxHeight: '1400px',
  p: 40,
  display: 'flex',
  flexDirection: 'column',

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
