import { css } from '_panda/css';

import { TabBar } from '@/components/Layout/TabBar';

import { ProfileSection } from './ProfileSection';

async function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={containerStyle}>
      <ProfileSection />
      {children}
      <TabBar />
    </div>
  );
}

export default MypageLayout;

const containerStyle = css({
  minHeight: '100vh',
  height: '100vh',
  backgroundColor: 'gray.gray_050',
  position: 'relative',
  flexDir: 'column',
  display: 'flex',
  padding: '0 16px 60px',
  gap: 0,
});
