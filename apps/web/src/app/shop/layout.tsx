import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GitAnimals | Shop',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
