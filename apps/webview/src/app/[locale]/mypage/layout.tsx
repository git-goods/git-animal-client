import { css } from '_panda/css';
import { grid } from '_panda/patterns';

import { ProfileSection } from './ProfileSection';

async function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={containerStyle}>
      <div className={mainStyle}>
        <ProfileSection />
        {children}
      </div>
    </div>
  );
}

export default MypageLayout;

const mainStyle = grid({
  position: 'relative',
  zIndex: 'aboveDefault',
  minHeight: 'calc(100vh - 60px)',

  gridTemplateColumns: '1fr',
  padding: '0 16px 0',
  gap: 0,
});

const containerStyle = css({
  minHeight: '100vh',
  height: 'fit-content',
  backgroundColor: 'gray.gray_050',
});
