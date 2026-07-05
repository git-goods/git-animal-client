/* eslint-disable @next/next/no-img-element */
'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { userQueries } from '@gitanimals/react-query';
import { cn, Skeleton } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronRight, FlaskConical } from 'lucide-react';

import { Link, usePathname } from '@/i18n/routing';
import { addNumberComma } from '@/utils/number';

const profileSkeletonStyle = '[&>div]:m-[32px_20px] mobile:[&>div]:w-[48px] mobile:[&>div]:h-[48px]';

export const ProfileSection = memo(
  wrap
    .Suspense({
      fallback: (
        <section className={profileSkeletonStyle}>
          <Skeleton className="h-[160px] w-[160px] rounded-full" />
        </section>
      ),
    })
    .ErrorBoundary({ fallback: <section></section> })
    .on(function ProfileSection() {
      const t = useTranslations('Mypage');
      const pathname = usePathname();

      const { data } = useSuspenseQuery(userQueries.userOptions());

      const isMypagePath = pathname === '/mypage';
      const isMyPetPath = pathname === '/mypage/my-pet';

      return (
        <section className={profileSectionStyle}>
          <div className={profileImageStyle}>
            <img src={data.profileImage ?? ''} alt="profile" width={160} height={160} className="w-full h-full" />
          </div>
          <div className={profileTextStyle}>
            <p className={profileNameStyle}>{data?.username}</p>
            <div className={pointStyle}>
              <Image src="/mypage/coin.svg" alt="coin" width={24} height={24} /> {addNumberComma(data.points ?? 0)}
            </div>
          </div>
          <hr className={dividerStyle} />
          <div className={navStyle}>
            <Link href="/mypage" className={cn(navItemStyle, isMypagePath && navItemSelectedStyle)}>
              <ChevronRight size={20} color={isMypagePath ? '#FCFD9C' : '#FFFFFF80'} />
              <span>{t('github-custom')}</span>
            </Link>
            <Link href="/mypage/my-pet" className={cn(navItemStyle, isMyPetPath && navItemSelectedStyle)}>
              <ChevronRight size={20} color={isMyPetPath ? '#FCFD9C' : '#FFFFFF80'} />
              <span>{t('my-pet')}</span>
            </Link>
          </div>
          <Link href="/laboratory" className={laboButtonStyle}>
            <FlaskConical />
            {t('laboratory')}
          </Link>
        </section>
      );
    }),
);

const laboButtonStyle = cn(
  'bg-white-10 [backdrop-filter:blur(7px)] rounded-[8px] px-[20px] py-[10px]',
  'flex items-center gap-[10px] glyph16-regular text-white-100',
  'mt-[24px] [animation:pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] [transition:background_0.3s_ease]',
  'hover:[background:linear-gradient(150.51deg,#016EDB_11.25%,#16B7CD_61.95%,#5CCA69_94.01%)] hover:[animation:pulse_1.6s_cubic-bezier(0.4,0,0.6,1)_infinite]',
  'pc:px-[12px] pc:py-[8px] pc:[&>svg]:w-[18px] pc:[&>svg]:h-[18px]',
  'mobile:hidden',
);

const profileSectionStyle = 'mobile:flex mobile:px-[20px] mobile:py-[32px] mobile:gap-[12px] mobile:items-center';

const profileTextStyle = 'mobile:flex-1';

const navStyle = 'flex flex-col';

const navItemStyle = cn(
  'p-[4px] flex items-center gap-[4px] glyph18-regular text-white-50',
  'mobile:gap-0 mobile:glyph15-regular mobile:p-0',
);

const navItemSelectedStyle = 'text-brand-canary';

const dividerStyle = 'bg-white-25 h-[1px] m-0 border-none mt-[48px] mb-[20px] mobile:hidden';

const profileImageStyle = cn(
  'w-[160px] h-[160px] rounded-[50%] bg-[#fff] overflow-hidden',
  'mobile:w-[48px] mobile:h-[48px]',
);

const profileNameStyle = cn(
  'text-white glyph48-bold mt-[8px] mb-[4px]',
  'mobile:glyph24-bold mobile:m-0 mobile:mb-[2px]',
);

const pointStyle = cn(
  'flex text-white glyph24-regular gap-[6px] items-center',
  'mobile:glyph14-regular mobile:[&_img]:w-[16px] mobile:[&_img]:h-[16px]',
);
