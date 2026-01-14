import { cn } from '@gitanimals/ui-tailwind';

import GNB from '@/components/GNB/GNB';

import { ProfileSection } from './ProfileSection';

async function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-fit bg-[#019C5A]">
      <GNB />
      <div
        className={cn(
          'grid gap-20 grid-cols-[222px_1fr] relative z-aboveDefault',
          'py-[120px] px-[200px] min-h-[var(--main-min-height)]',
          'max-pc:py-8 max-pc:px-10',
          'max-mobile:grid-cols-1 max-mobile:px-4 max-mobile:py-0 max-mobile:gap-0'
        )}
      >
        <ProfileSection />
        <div
          className={cn(
            'overflow-x-hidden w-full rounded-2xl',
            'bg-white/10 backdrop-blur-[7px] max-h-[1400px]',
            'p-10 flex flex-col relative gap-10',
            'max-pc:gap-6 max-pc:p-6',
            'max-mobile:gap-3 max-mobile:bg-transparent max-mobile:p-0',
            'max-mobile:max-h-none max-mobile:h-auto max-mobile:overflow-y-auto max-mobile:rounded-none'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default MypageLayout;
