'use client';

import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';

import { TabBar } from '@/components/Layout/TabBar';
import { ROUTE } from '@/constants/route';
import { Link } from '@/i18n/routing';

import { Background } from './quiz/_components/BackGround';

function GamePage() {
  const t = useTranslations('Game');

  return (
    <>
      <Background widthBottom />
      <div className={containerStyle}>
        <h1 className={titleStyle}>Game</h1>
        <p className={descriptionStyle}>Join the game and earn points!</p>
        <Link href={ROUTE.GAME.QUIZ.MAIN()}>
          <Button>Quiz</Button>
        </Link>
      </div>
      <TabBar />
    </>
  );
}

export default GamePage;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '40px 16px',
});

const titleStyle = css({
  marginBottom: '8px',
  textStyle: 'glyph40.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});

const descriptionStyle = css({
  marginBottom: '48px',
  textStyle: 'glyph18.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  color: 'white.white_90',
});
