import type { PropsWithChildren } from 'react';

import { PageModalLayout } from '@/app/[locale]/guild/_components/PageModal';

export default function GuildSettingLayout({ children }: PropsWithChildren) {
  return <PageModalLayout>{children}</PageModalLayout>;
}
