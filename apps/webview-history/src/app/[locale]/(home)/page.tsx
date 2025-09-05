'use client';

import { signOut } from 'next-auth/react';
import { css } from '_panda/css';

import { TabBar } from '@/components/Layout/TabBar';

import CharacterView from './_components/CharacterView';
import { ProfileBoard } from './_components/ProfileBoard';

export default function WebviewPage() {
  const handleLogout = () => {
    // React Native로 logout 메시지 전송
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'LOGOUT',
        }),
      );

      signOut();
    } else {
      // 웹 브라우저에서의 경우 일반적인 로그아웃 처리
      console.log('Logout clicked in web browser');
      signOut();
    }
  };

  return (
    <div className={containerStyle}>
      <button onClick={handleLogout} className={logoutButtonStyle}>
        logout
      </button>
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

const logoutButtonStyle = css({
  position: 'absolute',
  top: '20px',
  right: '20px',
  zIndex: 10,
  padding: '8px 16px',
  backgroundColor: '#ff4444',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',

  _hover: {
    backgroundColor: '#cc3333',
  },
});
