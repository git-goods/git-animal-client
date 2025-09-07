'use client';

import { css } from '_panda/css';

import CharacterView from './_components/CharacterView';
import { ProfileBoard } from './_components/ProfileBoard';
import { authUtils } from '@/utils';
import { useState, useEffect } from 'react';

export default function WebviewPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authUtils.isAuthenticated());

    const unsubscribe = authUtils.onAuthStateChange((authState: boolean) => {
      setIsAuthenticated(authState);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={containerStyle}>
      <div className={backgroundStyle}>
        <img src="/assets/home/app-background-home.png" alt="background" />
      </div>
      <div className={css({ position: 'relative' })}>
        <ProfileBoard />
        <CharacterView />
      </div>
    </div>
  );
}

const containerStyle = css({
  w: '100%',
  h: '100%',
  minH: '100vh',
  maxW: 'var(--container-max-width)',
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
