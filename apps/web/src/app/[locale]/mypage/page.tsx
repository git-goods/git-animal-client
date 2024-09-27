// import React from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { css } from '_panda/css';

import GNB from '@/components/GNB/GNB';

import RightSection from './RightSection';

const LazyProfileSection = dynamic(() => import('./ProfileSection'), { ssr: false });

function Mypage() {
  return (
    <div className={containerStyle}>
      <GNB />
      <main className={mainStyle}>
        <Suspense fallback={<section></section>}>
          <LazyProfileSection />
        </Suspense>
        <RightSection />
      </main>
    </div>
  );
}

export default Mypage;

const containerStyle = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  minWidth: '1400px',
  backgroundColor: '#297542',
  '& > img': {
    zIndex: -1,
    objectFit: 'cover',
  },
  '& > main': {
    minHeight: '100vh',
    zIndex: 1,
  },
});

const mainStyle = css({
  padding: '170px 0 0',
  display: 'grid',
  justifyContent: 'center',
  gap: '100px',
  gridTemplateColumns: '230px 1fr',
  maxWidth: '1200px',
  width: 'fit-content',
  margin: '0 auto',
});
