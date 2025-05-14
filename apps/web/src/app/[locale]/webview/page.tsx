'use client';

import { css } from '_panda/css';

import CharacterView from './CharacterView';

export default function WebviewPage() {
  return (
    <div className={containerStyle}>
      <CharacterView />
      <div className={backgroundStyle}>
        <img src="/webview/app-background-home.png" alt="background" />
      </div>
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
  justifyContent: 'flex-end',
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

  '& img': {
    w: '100%',
    objectFit: 'cover',
    objectPosition: 'bottom center',
  },
});
