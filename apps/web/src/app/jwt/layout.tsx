import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GitAnimals | Login',
};

export default function JWTLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
