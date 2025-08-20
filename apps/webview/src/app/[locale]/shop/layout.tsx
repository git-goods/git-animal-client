import { Suspense } from 'react';

import { TabBar } from '@/components/Layout/TabBar';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      {children}
      <TabBar />
    </Suspense>
  );
}
