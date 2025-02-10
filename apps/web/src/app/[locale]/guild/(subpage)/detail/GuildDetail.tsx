/* eslint-disable @next/next/no-img-element */
'use client';

import { css } from '_panda/css';
import { flex } from '_panda/patterns';
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
const guildPreviewStyle = css({
  aspectRatio: '1/0.5',
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
  },
});

const titleStyle = flex({
  alignItems: 'center',
  gap: 4,
  textStyle: 'glyph36.bold',
  color: 'white.white_100',
  '& img': {
    borderRadius: '8px',
  },
});

const bodyStyle = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_75',
  mt: 3,
});
