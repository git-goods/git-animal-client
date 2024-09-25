// import React from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import { grid } from '_panda/patterns';

import GNB from '@/components/GNB/GNB';

import { ProfileSection } from './ProfileSection';

function Mypage() {
  return (
    <div className={containerStyle}>
      <GNB />
      <Image src="/mypage/bg-cloud.webp" alt="bg" width={2400} height={1367} className={bgStyle} />
      <main className={mainStyle}>
        <ProfileSection />
        {/* <RightSection /> */}
      </main>
    </div>
  );
}

export default Mypage;

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
});

const mainStyle = grid({
  gap: 80,
  gridTemplateColumns: '222px 1fr',
  position: 'relative',
  zIndex: 1,
  margin: '120px 200px 0',
});
