'use client';

import { css } from '_panda/css';
import { TabBar } from '@/components/Layout/TabBar';

import { ProfileBoard } from './_components/ProfileBoard';
import CharacterView from './CharacterView';

export default function WebviewPage() {
  return (
    <div className={containerStyle}>
      <ProfileBoard />
      <CharacterView />
      <div className={backgroundStyle}>
        <img src="/assets/home/app-background-home.png" alt="background" />
      </div>
      <TabBar />
    </div>
  );
}

const containerStyle = css({
  w: '100%',
  h: '100%',
  minH: '100vh',
  maxW: '560px',
  mx: 'auto',
  position: 'relative',
  paddingBottom: '160px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const backgroundStyle = css({
  w: '100%',
  h: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: -1,
  bg: '#098761',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingBottom: '56px',

  '& img': {
    w: '100%',
    minH: '90%',
    objectFit: 'cover',
    objectPosition: 'bottom center',
  },
});
