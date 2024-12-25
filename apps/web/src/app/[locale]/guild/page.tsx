import Image from 'next/image';
import { css } from '_panda/css';
import { Grid } from '_panda/jsx';
import { generateRandomKey, searchGuild } from '@gitanimals/api';

import { GuildCard } from './(list)/GuildCard';

export default async function GuildPage() {
  const randomId = generateRandomKey();

  const data = await searchGuild({
    key: randomId,
    filter: 'RANDOM',
  });

  return (
    <div className={containerStyle}>
      <Grid columns={3} gap="8px" _mobile={{ columns: 1 }} maxWidth="880px" mx="auto">
        {data.guilds.map((guild) => (
          <GuildCard key={guild.id} guild={guild} />
        ))}
      </Grid>
      <Image src="/guild/init-bg-bottom.png" className={bottomBgStyle} alt="init-bg-bottom" width={3600} height={228} />
    </div>
  );
}

const containerStyle = css({
  width: '100%',
  height: '100%',
  padding: '120px 0',
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
