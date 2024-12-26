import Image from 'next/image';
import { css } from '_panda/css';
import { flex, grid } from '_panda/patterns';
import { generateRandomKey, searchGuild } from '@gitanimals/api';
import { SearchBar } from '@gitanimals/ui-panda';
import { getNewUrl } from '@gitanimals/util-common';

import { PaginationServer } from '@/components/Pagination/PaginationServer';

import { GuildCard } from './(list)/GuildCard';

const GUILD_PAGE_URL = '/guild';
export default async function GuildPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    rd?: string;
  };
}) {
  const randomId = searchParams.rd ? Number(searchParams.rd) : generateRandomKey();

  const data = await searchGuild({
    key: randomId,
    filter: 'RANDOM',
  });

  const getGuildPageUrl = (params: Record<string, unknown>) => {
    const newParams = { ...params, rd: randomId };
    return getNewUrl({ baseUrl: GUILD_PAGE_URL, newParams, oldParams: searchParams });
  };

  return (
    <div className={containerStyle}>
      <SearchBar />
      <div className={cardListStyle}>
        {data.guilds.map((guild) => (
          <GuildCard key={guild.id} guild={guild} />
        ))}
      </div>
      <PaginationServer {...data.pagination} generateMoveLink={getGuildPageUrl} />
      <Image
        src="/guild/init-bg-bottom.webp"
        className={bottomBgStyle}
        alt="init-bg-bottom"
        width={3600}
        height={228}
      />
    </div>
  );
}

const containerStyle = flex({
  width: '100%',
  height: '100%',
  padding: '120px 0',
  flexDirection: 'column',
  maxWidth: '880px',
  mx: 'auto',
  gap: 4,
});

const cardListStyle = grid({
  columns: 3,
  gap: '8px',
  w: 'full',
  _mobile: {
    columns: 1,
  },
});

const bottomBgStyle = css({
  position: 'absolute',
  width: '100vw',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  height: '228px',
  objectFit: 'cover',
});
