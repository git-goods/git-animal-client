import type { PropsWithChildren } from 'react';

import { GuildModalPageLayout } from '../../_components/GuildModalPageLayout';

export default function GuildCreatePage({ children }: PropsWithChildren) {
  return <GuildModalPageLayout>{children}</GuildModalPageLayout>;
}
