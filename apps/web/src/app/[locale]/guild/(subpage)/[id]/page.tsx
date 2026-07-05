/* eslint-disable @next/next/no-img-element */
import { getGuildById } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-tailwind';
import { SearchIcon } from 'lucide-react';

import { GitanimalsGuild } from '@/components/Gitanimals';
import { Link } from '@/i18n/routing';

import { GuildPeopleList } from '../../_components/GuildPeopleList';

import { CopyGuildImgButton } from './CopyGuildImgButton';
import { GuildSliderContainer } from './GuildSliderContainer';
import { MoreMenu } from './MoreMenu';

export default async function GuildPage({ params }: { params: { id: string } }) {
  const data = await getGuildById({ guildId: params.id });

  return (
    <>
      <div className="flex gap-2 items-center justify-end [&>*]:h-[40px] w-full mb-4">
        <Link
          href="/guild?search=true"
          className="flex items-center justify-center w-[40px] h-[40px] bg-white-25 rounded-[10px]"
        >
          <SearchIcon color="rgba(255, 255, 255, 0.5)" width={20} height={20} />
        </Link>

        <Link href="/guild/create">
          <Button size="m" className="min-w-[126px] px-[20px]">
            Create Guild
          </Button>
        </Link>
      </div>
      <GuildSliderContainer guildId={data.id}>
        <div className="flex flex-col gap-8 p-10 rounded-[16px] bg-white-10 backdrop-blur-[7px]">
          <div>
            <div className="flex items-center gap-4 glyph36-bold text-white-100 [&_img]:rounded-[8px] [&_h2]:flex-1">
              <img src={data.guildIcon} width={40} height={40} alt={data.title} draggable={false} />
              <h2>{data.title}</h2>

              <MoreMenu guildId={data.id} />
            </div>
            <div className="glyph16-regular text-white-75 mt-3">{data.body}</div>
          </div>
          <GuildPeopleList members={data.members} leader={data.leader} />

          <div className="aspect-[1/0.5] w-full rounded-[8px] overflow-hidden [&_img]:w-full [&_img]:h-full">
            <GitanimalsGuild guildId={data.id} />
          </div>
          <CopyGuildImgButton guildId={data.id} />
        </div>
      </GuildSliderContainer>
    </>
  );
}

