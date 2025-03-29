import { Suspense } from 'react';

import { MobileLayout } from '@/app/[locale]/quiz/_common/MobileLayout';
import GNB from '@/components/GNB/GNB';

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div>
        <GNB />
        <main>
          <MobileLayout>{children}</MobileLayout>
        </main>
      </div>
    </Suspense>
  );
}
