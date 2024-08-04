import { Suspense } from 'react';

export default function JWTLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
