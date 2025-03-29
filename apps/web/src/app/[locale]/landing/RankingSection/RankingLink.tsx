'use client';

import { useSearchParams } from 'next/navigation';

import { USER_GITHUB_URL } from '@/constants/route';

export function RankingLink({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get('ranking') ?? 'people';

  switch (selectedTab) {
    case 'people':
      return (
        <a href={USER_GITHUB_URL(id)} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      );
    // TODO:API 반영 필요
    case 'guild':
      return <div className={className}>{children}</div>;
  }
}
