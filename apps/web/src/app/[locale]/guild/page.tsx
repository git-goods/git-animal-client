import Image from 'next/image';
import { css } from '_panda/css';
import { flex, grid } from '_panda/patterns';
import type { FilterType } from '@gitanimals/api';
import { generateRandomKey, getAllJoinGuilds, searchGuild } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';
import { getNewUrl } from '@gitanimals/util-common';
import { ChevronLeftIcon } from 'lucide-react';

import { PaginationServer } from '@/components/Pagination/PaginationServer';
import { BackTrigger } from '@/components/Trigger';
import { ROUTE } from '@/constants/route';
import { Link, redirect } from '@/i18n/routing';

import { GuildCard } from './_components/GuildCard';
import { GuildSearch } from './_components/GuildSearch';
import { SortSelect } from './_components/SortSelect';

interface GuildPageProps {
  searchParams: {
    page?: string;
    rd?: string;
    filter?: FilterType;
    text?: string;
    search?: string;
  };
}

export default async function GuildPage({ searchParams }: GuildPageProps) {
  return <GuildInner searchParams={searchParams} />;
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
  const randomId = searchParams.rd ? Number(searchParams.rd) : generateRandomKey();
  const data = await searchGuild({
    key: randomId,
    filter: searchParams.filter ?? 'RANDOM',
    text: searchParams.text,
  });

  const getGuildPageUrl = (params: Record<string, unknown>) => {
    const newParams = { ...params, rd: randomId };
    return getNewUrl({ baseUrl: ROUTE.GUILD.LIST(), newParams, oldParams: searchParams });
  };

  return (
    <>
      <div className={containerStyle}>
        <div className={topStyle}>
          {isSearchMode && (
            <BackTrigger>
              <ChevronLeftIcon size="28px" color="#FFFFFF80" />
            </BackTrigger>
          )}
          <GuildSearch />

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
        <PaginationServer {...data.pagination} generateMoveLink={getGuildPageUrl} />
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
  zIndex: 1,
  minH: 'fit-content',
});

const cardListStyle = grid({
  // gridTemplateRows: 'repeat(3, 210px)',
  columns: 3,
  gap: '8px',
  w: 'full',
  _mobile: {
    columns: 1,
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
  zIndex: 0,
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
