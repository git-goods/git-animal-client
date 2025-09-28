'use client';

import { useSearchParams } from 'next/navigation';

import { DEV_MODE_KEY, parseDevModeFromSearchParams } from '@/lib/devtools/constants';

const DevModePage = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const isDevMode = parseDevModeFromSearchParams(searchParams.get(DEV_MODE_KEY) ?? '');

  if (!isDevMode) {
    return null;
  }

  return <>{children}</>;
};

export default DevModePage;
