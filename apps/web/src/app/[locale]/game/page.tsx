'use client';

import { ROUTE } from '@/constants/route';
import { redirect } from '@/i18n/routing';

function GamePage() {
  redirect(ROUTE.GAME.QUIZ.MAIN());
}

export default GamePage;
