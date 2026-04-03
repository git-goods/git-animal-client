import type { ReactNode } from 'react';

import { PageModalLayout } from '@/app/[locale]/guild/_components/PageModal';

export default function GuildDetailLayout({ children }: { children: ReactNode }) {
  return <PageModalLayout>{children}</PageModalLayout>;
}
