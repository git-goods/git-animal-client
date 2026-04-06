'use client';

import { Button } from '@gitanimals/ui-tailwind';

import { Background } from './quiz/_components/BackGround';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/router/constants';

function GamePage() {
  return (
    <>
      <Background widthBottom />
      <div className="flex h-full w-full flex-col items-center justify-center px-4 py-10">
        <h1 className="mb-2 font-product text-glyph-40 font-bold text-white">Game</h1>
        <p className="mb-12 font-product text-glyph-18 font-normal text-white/90">Join the game and earn points!</p>
        <Link to={ROUTES.GAME.QUIZ.MAIN()}>
          <Button>Quiz</Button>
        </Link>
      </div>
    </>
  );
}

export default GamePage;
