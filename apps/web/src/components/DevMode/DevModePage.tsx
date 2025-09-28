import { parseDevModeFromSearchParams } from '@/lib/devtools/constants';

const DevModePage = ({ devMode, children }: { devMode?: string; children: React.ReactNode }) => {
  const isDevMode = parseDevModeFromSearchParams(devMode ?? '');

  if (!isDevMode) {
    return null;
  }

  return <>{children}</>;
};

export default DevModePage;
