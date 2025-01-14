import type { PropsWithChildren } from 'react';

import { PageModalLayout } from '@/components/PageModal';

export default function GuildSettingLayout({ children }: PropsWithChildren) {
  return <PageModalLayout>{children}</PageModalLayout>;
}
