import { Suspense } from 'react';

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
