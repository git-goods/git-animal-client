import { Suspense } from 'react';

import { MobileLayout } from '@/app/[locale]/game/quiz/_components/MobileLayout';
import DevModePage from '@/components/DevMode/DevModePage';

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <DevModePage>
        <MobileLayout background={{ url: '/assets/game/quiz/quiz-bg.webp', position: 'bottom' }}>
          {children}
        </MobileLayout>
      </DevModePage>
    </Suspense>
  );
}
