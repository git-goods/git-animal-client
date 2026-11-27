import { cn } from '@gitanimals/ui-tailwind';

import GNB from '@/components/GNB/GNB';

import { ProfileSection } from './ProfileSection';

async function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={containerStyle}>
      <GNB />
      <div className={mainStyle}>
        <ProfileSection />
        <div className={rightSectionStyle}>{children}</div>
      </div>
    </div>
  );
}

export default MypageLayout;

const mainStyle = cn(
  'grid gap-[80px] grid-cols-[222px_1fr] relative z-aboveDefault px-[200px] py-[120px] min-h-[var(--main-min-height)]',
  'pc:px-[40px] pc:py-[32px]',
  // TODO : 중간 태블릿 정도도 대응하면 좋을 듯
  'mobile:grid-cols-[1fr] mobile:px-[16px] mobile:pt-0 mobile:pb-0 mobile:gap-0',
);

const rightSectionStyle = cn(
  'overflow-x-hidden w-full rounded-[16px] bg-white-alpha-10 [backdrop-filter:blur(7px)] max-h-[1400px] p-[40px]',
  'flex flex-col relative gap-[40px]',
  'pc:gap-[24px] pc:p-[24px]',
  'mobile:gap-[12px] mobile:bg-none mobile:p-0 mobile:max-h-[auto] mobile:h-auto mobile:overflow-y-auto mobile:rounded-none',
);

const containerStyle = 'min-h-screen h-fit bg-green-500';
