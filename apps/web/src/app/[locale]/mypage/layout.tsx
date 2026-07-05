import { getTranslations } from 'next-intl/server';
import { cn } from '@gitanimals/ui-tailwind';
import { FlaskConical } from 'lucide-react';

import GNB from '@/components/GNB/GNB';
import { Link } from '@/i18n/routing';

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

async function LaboButton() {
  const t = await getTranslations('Mypage');
  return (
    <Link href="/laboratory" className={laboButtonStyle}>
      <FlaskConical />
      {t('laboratory')}
    </Link>
  );
}

const laboButtonStyle = cn(
  'absolute bg-white-10 [backdrop-filter:blur(7px)] rounded-[8px] px-[20px] py-[10px]',
  'flex items-center gap-[10px] glyph16-regular text-white-100',
  'top-[64px] right-[200px]',
  'pc:top-[12px] pc:right-[40px] pc:px-[12px] pc:py-[8px] pc:[&>svg]:w-[18px] pc:[&>svg]:h-[18px]',
  'mobile:hidden',
);

const mainStyle = cn(
  'grid gap-[80px] grid-cols-[222px_1fr] relative z-aboveDefault px-[200px] py-[120px] min-h-[var(--main-min-height)]',
  'pc:px-[40px] pc:py-[32px]',
  // TODO : 중간 태블릿 정도도 대응하면 좋을 듯
  'mobile:grid-cols-[1fr] mobile:px-[16px] mobile:pt-0 mobile:pb-0 mobile:gap-0',
);

const rightSectionStyle = cn(
  'overflow-x-hidden w-full rounded-[16px] bg-white-10 [backdrop-filter:blur(7px)] max-h-[1400px] p-[40px]',
  'flex flex-col relative gap-[40px]',
  'pc:gap-[24px] pc:p-[24px]',
  'mobile:gap-[12px] mobile:bg-none mobile:p-0 mobile:max-h-[auto] mobile:h-auto mobile:overflow-y-auto mobile:rounded-none',
);

const containerStyle = 'min-h-screen h-fit bg-[#019C5A]';
