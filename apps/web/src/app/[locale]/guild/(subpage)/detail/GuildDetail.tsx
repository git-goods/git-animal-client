/* eslint-disable @next/next/no-img-element */
'use client';

import type { Guild } from '@gitanimals/api';

import { GitanimalsGuild } from '@/components/Gitanimals';

import { GuildPeopleList } from '../../_components/GuildPeopleList';

export const GuildDetail = ({ details }: { guildId: string; details: Guild }) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-4 glyph36-bold text-white-100 [&_img]:rounded-[8px]">
          <img src={details.guildIcon} width={40} height={40} alt={details.title} />
          <h2>{details.title}</h2>
        </div>
        <div className="glyph16-regular text-white-75 mt-3">{details.body}</div>
      </div>
      <GuildPeopleList members={details.members} leader={details.leader} />
      <div className="aspect-[1/0.5] w-full rounded-[8px] overflow-hidden [&_img]:w-full [&_img]:h-full">
        <GitanimalsGuild guildId={details.id} />
      </div>
    </>
  );
};
