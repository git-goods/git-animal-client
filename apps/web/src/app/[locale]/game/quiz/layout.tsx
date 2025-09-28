import { Suspense } from 'react';

import { MobileLayout } from '@/app/[locale]/game/quiz/_components/MobileLayout';

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <MobileLayout background={{ url: '/assets/game/quiz/quiz-bg.webp', position: 'bottom' }}>{children}</MobileLayout>
    </Suspense>
  );
}
