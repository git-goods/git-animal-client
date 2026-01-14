/* eslint-disable simple-import-sort/imports */
import type { FilterType } from '@gitanimals/api';
import { getAllJoinGuilds, getUser, searchGuild } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { getNewUrl } from '@gitanimals/util-common';
import { ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';

import { PaginationServer } from '@/components/Pagination/PaginationServer';
import { BackTrigger } from '@/components/Trigger';
import { ROUTE } from '@/constants/route';
import { Link, redirect } from '@/i18n/routing';

import { GuildCard } from './_components/GuildCard';
import { GuildSearch } from './_components/GuildSearch';
import { SortSelect } from './_components/SortSelect';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import { CustomException } from '@gitanimals/exception';

interface GuildPageProps {
  searchParams: {
    page?: string;
    rd?: string;
    filter?: FilterType;
    text?: string;
    search?: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page');

  return {
    title: t('guild'),
  };
}

export default async function GuildPage({ searchParams }: GuildPageProps) {
  let redirectUrl = null;
  try {
    const session = await getServerSession();

    if (!session) {
      throw new Error('session not found');
    }

    return <GuildInner searchParams={searchParams} />;
  } catch (error) {
    redirectUrl = ROUTE.HOME();
  }

  if (redirectUrl) {
    redirect(redirectUrl);
  }
}

async function GuildInner({ searchParams }: GuildPageProps) {
  let redirectUrl = null;
  try {
    const isSearchMode = Boolean(searchParams.search);

    await getUser(); // 토큰 유효성 검사

    const allJoinGuilds = await getAllJoinGuilds();

    if (isSearchMode) {
      return <GuildMain searchParams={searchParams} isSearchMode />;
    }

    if (allJoinGuilds.guilds.length === 0) {
      return <GuildMain searchParams={searchParams} />;
    }

    const guildId = allJoinGuilds.guilds[0].id;
    redirectUrl = ROUTE.GUILD.MAIN(guildId);
  } catch (error) {
    if (error instanceof CustomException) {
      if (error.code === 'TOKEN_EXPIRED') {
        redirectUrl = ROUTE.AUTH.SIGN_OUT();
      }
    }
  }

  if (redirectUrl) {
    redirect(redirectUrl);
  }
}

interface GuildMainProps {
  searchParams: {
    page?: string;
    rd?: string;
    filter?: FilterType;
    text?: string;
  };
  isSearchMode?: boolean;
}

async function GuildMain({ searchParams, isSearchMode }: GuildMainProps) {
  const randomId = searchParams?.rd ? Number(searchParams.rd) : generateRandomKey();
  const data = await searchGuild({
    key: randomId,
    filter: searchParams.filter ?? 'RANDOM',
    text: searchParams?.text,
    pageNumber: searchParams?.page ? Number(searchParams.page) : undefined,
  });

  const getGuildPageUrl = (params: Record<string, unknown>) => {
    const newParams = { ...params, rd: randomId };
    return getNewUrl({ baseUrl: ROUTE.GUILD.LIST(), newParams, oldParams: searchParams });
  };

  return (
    <>
      <div className={containerStyle}>
        <div className={topStyle}>
          <div className="flex-1">
            {isSearchMode && (
              <BackTrigger>
                <ChevronLeftIcon size="28px" color="#FFFFFF80" />
              </BackTrigger>
            )}
            <GuildSearch />
          </div>

          <SortSelect />
          <Link href="/guild/create">
            <Button size="m" className="min-w-[126px] px-5">
              Create Guild
            </Button>
          </Link>
        </div>
        <div className={cardListStyle}>
          {data.guilds.length === 0 && <EmptyGuild />}
          {data.guilds.map((guild) => (
            <GuildCard key={guild.id} guild={guild} />
          ))}
        </div>
        <PaginationServer
          {...data.pagination}
          generateMoveLink={getGuildPageUrl}
          currentPage={searchParams.page ? Number(searchParams.page) : 0}
          key={data.pagination.currentPage}
        />
      </div>
      <Image
        src="/guild/init-bg-bottom.webp"
        className={bottomBgStyle}
        alt="init-bg-bottom"
        width={3600}
        height={228}
      />
    </>
  );
}

const topStyle = cn(
  'flex gap-2 items-center',
  '[&>*]:h-10 [&>*]:flex [&>*]:gap-2 [&>*]:items-center',
  'max-mobile:flex-wrap-reverse max-mobile:justify-end',
);

const containerStyle = cn(
  'flex w-full h-full py-[120px] flex-col max-w-[880px] mx-auto gap-4 relative min-h-fit z-floating',
  'max-mobile:px-5 max-mobile:py-8',
);

const cardListStyle = cn('grid grid-cols-3 gap-2 w-full', 'max-mobile:grid-cols-1');

const cardListEmptyStyle = cn(
  'w-full h-full col-span-full row-span-full flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-[7px]',
);

const emptyStyle = cn('flex flex-col items-center justify-center text-white/50 font-product text-glyph-16');

const bottomBgStyle = cn('absolute w-screen bottom-0 left-1/2 -translate-x-1/2 h-[228px] object-cover z-base');

function EmptyGuild() {
  return (
    <div className={cardListEmptyStyle}>
      <div className={emptyStyle}>
        <Image src="/guild/empty-image.webp" alt="empty" width={80} height={80} />
        <p>Sorry, there is no item</p>
      </div>
    </div>
  );
}

const generateRandomKey = (): number => {
  return Math.floor(Math.random() * 100);
};
