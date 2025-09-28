import { Suspense } from 'react';

import { MobileLayout } from '@/app/[locale]/game/quiz/_components/MobileLayout';

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div>
        <main>
          <MobileLayout>{children}</MobileLayout>
        </main>
      </div>
    </Suspense>
  );
}
