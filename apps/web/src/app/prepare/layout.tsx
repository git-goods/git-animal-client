import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gitanimals | Prepare',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
