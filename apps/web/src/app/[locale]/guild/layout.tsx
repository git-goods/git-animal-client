import { cn } from '@gitanimals/ui-tailwind';

import GNB from '@/components/GNB/GNB';

export default function GuildLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      <GNB />
      <div className={containerStyle}>{children}</div>
      {modal}
    </>
  );
}

const containerStyle = cn(
  'w-full bg-[linear-gradient(180deg,#000_0%,#004875_38.51%,#005B93_52.46%,#006FB3_73.8%,#0187DB_100%)]',
  'min-h-fit h-[calc(100vh-60px)] overflow-hidden relative px-5',
  'max-mobile:min-h-[calc(100vh-var(--mobile-header-height))] max-mobile:h-full max-mobile:p-0',
);
