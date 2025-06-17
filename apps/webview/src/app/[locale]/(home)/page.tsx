'use client';

import { css } from '_panda/css';
import { center } from '_panda/patterns';
import { PawPrintIcon } from 'lucide-react';

import { TabBar } from '@/components/Layout/TabBar';
import { ROUTE } from '@/constants/route';
import { Link } from '@/i18n/routing';

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
      <SelectPetButton />
      <TabBar />
    </div>
  );
}

function SelectPetButton() {
  return (
    <Link
      href={ROUTE.HOME.PERSONA()}
      className={center({
        position: 'absolute',
        width: '48px',
        height: '48px',
        right: '18px',
        bottom: '74px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(40px)',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        zIndex: 100,
      })}
    >
      <PawPrintIcon className={css({ w: '24px', h: '24px' })} color="white" />
    </Link>
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
