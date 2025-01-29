'use client';

import Image from 'next/image';
import { Flex } from '_panda/jsx';
import { flex } from '_panda/patterns';
import { type Guild } from '@gitanimals/api';
import { UsersRoundIcon } from 'lucide-react';

import { ROUTE } from '@/constants/route';
import { Link } from '@/i18n/routing';

interface GuildCardProps {
  guild: Guild;
}

export function GuildCard({ guild }: GuildCardProps) {
  return (
    <>
      <Link href={ROUTE.GUILD.DETAIL(guild.id)} className={cardStyle}>
        <div className="card-top">
          <Image src={guild.guildIcon} alt={guild.title} width={40} height={40} className="card-guild-icon" />
          <Flex gap="6px" alignItems="center">
            <UsersRoundIcon size={16} color="#FFFFFF80" />
            <span>{guild.members.length + 1}/ 15</span>
          </Flex>
        </div>
        <h4 className="card-title">{guild.title}</h4>
        <p className="card-body">{guild.body}</p>

        <ul className="card-sub-info">
          <li>
            <span>Leader</span>
            <span>{guild.leader.name}</span>
          </li>
          <li>
            <span>Contributions</span>
            <span>{guild.totalContributions}</span>
          </li>
        </ul>
      </Link>
    </>
  );
}

const cardStyle = flex({
  width: '100%',
  height: '100%',
  padding: '24px',
  flexDirection: 'column',
  borderRadius: '12px',
  backgroundColor: 'white_10',
  backdropFilter: 'blur(7px)',
  color: 'white',
  _mobile: {
    width: 'calc(100vw - 40px)',
  },

  '& .card-top': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white.white_75',
    textStyle: 'glyph16.regular',
    alignItems: 'flex-start',
  },
  '& .card-guild-icon': {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
  },
  '& .card-title': {
    textStyle: 'glyph24.bold',
    mt: 3,
    mb: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& .card-body': {
    textStyle: 'glyph12.regular',
    color: 'white.white_75',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& .card-sub-info': {
    display: 'flex',
    flexDirection: 'column',
    mt: 4,
    textStyle: 'glyph14.regular',
    textAlign: 'left',
    alignItems: 'flex-start',

    '& span:first-child': {
      color: 'white.white_50',
      mr: 2,
    },
    '& span:last-child': {
      color: 'white',
    },
  },
});
