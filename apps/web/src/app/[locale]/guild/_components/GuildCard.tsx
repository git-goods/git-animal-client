'use client';

import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
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
          <div className="flex gap-1.5 items-center">
            <UsersRoundIcon size={16} color="#FFFFFF80" />
            <span>{guild.members.length + 1}/ 15</span>
          </div>
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

const cardStyle = cn(
  'flex w-full h-full p-6 flex-col rounded-xl bg-white/10 backdrop-blur-[7px] text-white',
  'max-mobile:w-[calc(100vw-40px)]',
  '[&_.card-top]:w-full [&_.card-top]:flex [&_.card-top]:justify-between [&_.card-top]:text-white/75 [&_.card-top]:font-product [&_.card-top]:text-glyph-16 [&_.card-top]:items-start',
  '[&_.card-guild-icon]:w-10 [&_.card-guild-icon]:h-10 [&_.card-guild-icon]:rounded-lg',
  '[&_.card-title]:font-product [&_.card-title]:text-glyph-24 [&_.card-title]:font-bold [&_.card-title]:mt-3 [&_.card-title]:mb-1 [&_.card-title]:overflow-hidden [&_.card-title]:text-ellipsis [&_.card-title]:whitespace-nowrap',
  '[&_.card-body]:font-product [&_.card-body]:text-glyph-12 [&_.card-body]:text-white/75 [&_.card-body]:overflow-hidden [&_.card-body]:text-ellipsis [&_.card-body]:whitespace-nowrap',
  '[&_.card-sub-info]:flex [&_.card-sub-info]:flex-col [&_.card-sub-info]:mt-4 [&_.card-sub-info]:font-product [&_.card-sub-info]:text-glyph-14 [&_.card-sub-info]:text-left [&_.card-sub-info]:items-start',
  '[&_.card-sub-info_span:first-child]:text-white/50 [&_.card-sub-info_span:first-child]:mr-2',
  '[&_.card-sub-info_span:last-child]:text-white',
);
