'use client';

import { ROUTE } from '@/shared/config/route';
import { redirect } from '@/shared/i18n/routing';

function GamePage() {
  redirect(ROUTE.GAME.QUIZ.MAIN());
}

export default GamePage;
