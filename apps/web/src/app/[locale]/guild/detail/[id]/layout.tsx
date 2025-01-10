import type { ReactNode } from 'react';

import { GuildModalPageLayout } from '../../_components/GuildModalPageLayout';

export default function GuildDetailLayout({ children }: { children: ReactNode }) {
  return <GuildModalPageLayout>{children}</GuildModalPageLayout>;
}
