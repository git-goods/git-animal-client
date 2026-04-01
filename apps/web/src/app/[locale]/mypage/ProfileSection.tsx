/* eslint-disable @next/next/no-img-element */
'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { Skeleton } from '@gitanimals/ui-tailwind';
import { userQueries } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronRight, FlaskConical } from 'lucide-react';

import { Link, usePathname } from '@/i18n/routing';
import { addNumberComma } from '@/utils/number';

export const ProfileSection = memo(
  wrap
    .Suspense({
      fallback: (
        <section className="[&>div]:mx-5 [&>div]:my-8 max-mobile:[&>div]:w-12 max-mobile:[&>div]:h-12">
          <Skeleton className="w-40 h-40 rounded-full" />
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
        <section className="max-mobile:flex max-mobile:p-[32px_20px] max-mobile:gap-3 max-mobile:items-center">
          <div
            className={cn(
              'w-40 h-40 rounded-full bg-white overflow-hidden',
              '[&_img]:w-full [&_img]:h-full',
              'max-mobile:w-12 max-mobile:h-12'
            )}
          >
            <img src={data.profileImage ?? ''} alt="profile" width={160} height={160} />
          </div>
          <div className="max-mobile:flex-1">
            <p
              className={cn(
                'text-white font-product text-glyph-48 font-bold mt-2 mb-1',
                'max-mobile:text-glyph-24 max-mobile:m-0 max-mobile:mb-0.5'
              )}
            >
              {data?.username}
            </p>
            <div
              className={cn(
                'flex text-white font-product text-glyph-24 gap-1.5 items-center',
                'max-mobile:text-glyph-14 max-mobile:[&_img]:w-4 max-mobile:[&_img]:h-4'
              )}
            >
              <Image src="/mypage/coin.svg" alt="coin" width={24} height={24} /> {addNumberComma(data.points ?? 0)}
            </div>
          </div>
          <hr className="bg-white/25 h-px m-0 border-none mt-12 mb-5 max-mobile:hidden" />
          <div className="flex flex-col">
            <Link
              href="/mypage"
              className={cn(
                'p-1 flex items-center gap-1 font-product text-glyph-18 text-white/50',
                '[&.selected]:text-brand-canary',
                'max-mobile:gap-0 max-mobile:text-glyph-15 max-mobile:p-0',
                isMypagePath && 'selected'
              )}
            >
              <ChevronRight size={20} color={isMypagePath ? '#FCFD9C' : '#FFFFFF80'} />
              <span>{t('github-custom')}</span>
            </Link>
            <Link
              href="/mypage/my-pet"
              className={cn(
                'p-1 flex items-center gap-1 font-product text-glyph-18 text-white/50',
                '[&.selected]:text-brand-canary',
                'max-mobile:gap-0 max-mobile:text-glyph-15 max-mobile:p-0',
                isMyPetPath && 'selected'
              )}
            >
              <ChevronRight size={20} color={isMyPetPath ? '#FCFD9C' : '#FFFFFF80'} />
              <span>{t('my-pet')}</span>
            </Link>
          </div>
          <Link
            href="/laboratory"
            className={cn(
              'bg-white/10 backdrop-blur-[7px] rounded-lg px-5 py-2.5',
              'flex items-center gap-2.5 font-product text-glyph-16 text-white',
              'mt-6 animate-pulse transition-[background] duration-300',
              'hover:bg-gradient-to-br hover:from-[#016EDB] hover:via-[#16B7CD] hover:to-[#5CCA69]',
              'max-pc:px-3 max-pc:py-2 max-pc:[&>svg]:w-[18px] max-pc:[&>svg]:h-[18px]',
              'max-mobile:hidden'
            )}
          >
            <FlaskConical />
            {t('laboratory')}
          </Link>
        </section>
      );
    }),
);
