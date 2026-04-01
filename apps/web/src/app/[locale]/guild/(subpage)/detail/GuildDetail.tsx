/* eslint-disable @next/next/no-img-element */
'use client';

import { cn } from '@gitanimals/ui-tailwind';
import type { Guild } from '@gitanimals/api';

import { GitanimalsGuild } from '@/components/Gitanimals';

import { GuildPeopleList } from '../../_components/GuildPeopleList';

export const GuildDetail = ({ details }: { guildId: string; details: Guild }) => {
  return (
    <>
      <div>
        <div className={titleStyle}>
          <img src={details.guildIcon} width={40} height={40} alt={details.title} />
          <h2>{details.title}</h2>
        </div>
        <div className={bodyStyle}>{details.body}</div>
      </div>
      <GuildPeopleList members={details.members} leader={details.leader} />
      <div className={guildPreviewStyle}>
        <GitanimalsGuild guildId={details.id} />
      </div>
    </>
  );
};

const guildPreviewStyle = cn(
  'aspect-[1/0.5] w-full rounded-lg overflow-hidden',
  '[&_img]:w-full [&_img]:h-full'
);

const titleStyle = cn(
  'flex items-center gap-1',
  'font-product text-glyph-36 font-bold text-white',
  '[&_img]:rounded-lg'
);

const bodyStyle = cn(
  'font-product text-glyph-16 text-white/75 mt-3'
);
