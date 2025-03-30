import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';
import { grid } from '_panda/patterns';
import { FlaskConical } from 'lucide-react';

import GNB from '@/components/GNB/GNB';
import { Link } from '@/i18n/routing';

import { ProfileSection } from './ProfileSection';

async function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={containerStyle}>
      <GNB />
      <div className={mainStyle}>
        <ProfileSection />
        <LaboButton />
        <div className={rightSectionStyle}>{children}</div>
      </div>
    </div>
  );
}

export default MypageLayout;

async function LaboButton() {
  const t = await getTranslations('Mypage');
  return (
    <Link href="/laboratory" className={laboButtonStyle}>
      <FlaskConical />
      {t('laboratory')}
    </Link>
  );
}

const laboButtonStyle = css({
  position: 'absolute',

  background: 'white.white_10',
  backdropFilter: 'blur(7px)',
  borderRadius: '8px',
  p: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textStyle: 'glyph16.regular',
  color: 'white.white_100',

  top: '64px',
  right: '200px',

  '@media (max-width: 1400px)': {
    right: '100px',
  },
  _mobile: {
    display: 'none',
  },
});

const mainStyle = grid({
  gap: '80px',
  gridTemplateColumns: '222px 1fr',
  position: 'relative',
  zIndex: 'aboveDefault',
  padding: '120px 200px',
  minHeight: 'calc(100vh - 60px)',
  // minHeight: 'fit-content',

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
  overflowX: 'hidden',
  width: '100%',
  borderRadius: '16px',
  background: 'white.white_10',
  backdropFilter: 'blur(7px)',
  maxHeight: '1400px',
  p: '40px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',

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
