/* eslint-disable simple-import-sort/imports */
import type { FilterType } from '@gitanimals/api';
import { getAllJoinGuilds, getUser, searchGuild } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-tailwind';
import { getNewUrl } from '@gitanimals/util-common';
import { ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';

import { PaginationServer } from '@/components/Pagination/PaginationServer';
import { BackTrigger } from '@/components/Trigger';
import { ROUTE } from '@/constants/route';
import { Link, redirect } from '@/i18n/routing';

import { GuildCard } from './_components/GuildCard';
import { GuildSearch } from './_components/GuildSearch';
import { GuildSortSelect } from './_components/GuildSortSelect';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CustomException } from '@gitanimals/exception';

import { getServerAuth } from '@/auth';

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
    const session = await getServerAuth();

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

          <GuildSortSelect />
          <Link href="/guild/create">
            <Button size="m" className="min-w-[126px] px-[20px]">
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

const topStyle =
  'flex gap-2 items-center [&>*]:h-[40px] [&>*]:flex [&>*]:gap-2 [&>*]:items-center mobile:flex-wrap-reverse mobile:justify-end';

const containerStyle =
  'flex w-full h-full py-[120px] flex-col max-w-[880px] mx-auto gap-4 relative min-h-fit z-floating mobile:px-5 mobile:py-8';

const cardListStyle = 'grid grid-cols-3 gap-[8px] w-full mobile:grid-cols-[1fr]';

const cardListEmptyStyle =
  'w-full h-full [grid-column:1_/_-1] [grid-row:1_/_-1] flex items-center justify-center rounded-[16px] bg-white-10 [backdrop-filter:blur(7px)]';

const emptyStyle = 'flex flex-col items-center justify-center text-white-50 glyph16-regular';

const bottomBgStyle =
  'absolute w-[100vw] bottom-0 left-[50%] [transform:translateX(-50%)] h-[228px] object-cover z-base';

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
