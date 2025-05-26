/* eslint-disable simple-import-sort/imports */
import type { FilterType } from '@gitanimals/api';
import { getAllJoinGuilds, searchGuild } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';
import { getNewUrl } from '@gitanimals/util-common';
import { css } from '_panda/css';
import { flex, grid } from '_panda/patterns';
import { ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';

import { PaginationServer } from '@/components/Pagination/PaginationServer';
import { BackTrigger } from '@/components/Trigger';
import { ROUTE } from '@/constants/route';
import { Link, redirect } from '@/i18n/routing';

import { GuildCard } from './_components/GuildCard';
import { GuildSearch } from './_components/GuildSearch';
import { SortSelect } from './_components/SortSelect';
import { Box } from '_panda/jsx';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';

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
  const isSearchMode = Boolean(searchParams.search);

  const allJoinGuilds = await getAllJoinGuilds();

  if (isSearchMode) {
    return <GuildMain searchParams={searchParams} isSearchMode />;
  }

  if (allJoinGuilds.guilds.length === 0) {
    return <GuildMain searchParams={searchParams} />;
  }

  const guildId = allJoinGuilds.guilds[0].id;
  redirect(ROUTE.GUILD.MAIN(guildId));
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

  console.log('a', data);

  const getGuildPageUrl = (params: Record<string, unknown>) => {
    const newParams = { ...params, rd: randomId };
    return getNewUrl({ baseUrl: ROUTE.GUILD.LIST(), newParams, oldParams: searchParams });
  };

  return (
    <>
      <div className={containerStyle}>
        <div className={topStyle}>
          <Box flex="1">
            {isSearchMode && (
              <BackTrigger>
                <ChevronLeftIcon size="28px" color="#FFFFFF80" />
              </BackTrigger>
            )}
            <GuildSearch />
          </Box>

          <SortSelect />
          <Link href="/guild/create">
            <Button minWidth="126px" size="m" px="20px">
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

const topStyle = flex({
  gap: 2,
  alignItems: 'center',
  '& > *': {
    height: '40px',
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },
  _mobile: {
    flexWrap: 'wrap-reverse',
    justifyContent: 'flex-end',
  },
});

const containerStyle = flex({
  width: '100%',
  height: '100%',
  padding: '120px 0',
  flexDirection: 'column',
  maxWidth: '880px',
  mx: 'auto',
  gap: 4,
  position: 'relative',
  minH: 'fit-content',
  zIndex: 'floating',

  _mobile: {
    paddingX: 5,
    py: 8,
  },
});

const cardListStyle = grid({
  // gridTemplateRows: 'repeat(3, 210px)',
  columns: 3,
  gap: '8px',
  w: 'full',
  _mobile: {
    gridTemplateColumns: '1fr',
  },
});
const cardListEmptyStyle = css({
  width: '100%',
  height: '100%',
  gridColumn: '1 / -1',
  gridRow: '1 / -1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '16px',
  background: 'white.white_10',
  backdropFilter: 'blur(7px)',
});

const emptyStyle = flex({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white.white_50',
  textStyle: 'glyph16.regular',
});

const bottomBgStyle = css({
  position: 'absolute',
  width: '100vw',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  height: '228px',
  objectFit: 'cover',
  zIndex: 'base',
});

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
