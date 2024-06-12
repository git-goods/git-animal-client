import { Suspense } from 'react';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
