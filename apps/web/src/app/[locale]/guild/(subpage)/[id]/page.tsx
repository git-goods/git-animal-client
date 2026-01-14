/* eslint-disable @next/next/no-img-element */
import { cn } from '@gitanimals/ui-tailwind/utils';
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
      <div className={topStyle}>
        <Link href="/guild?search=true" className={buttonWrapperStyle}>
          <SearchIcon color="rgba(255, 255, 255, 0.5)" width={20} height={20} />
        </Link>

        <Link href="/guild/create">
          <Button className="min-w-[126px] px-5" size="m">
            Create Guild
          </Button>
        </Link>
      </div>
      <GuildSliderContainer guildId={data.id}>
        <div className={containerStyle}>
          <div>
            <div className={titleStyle}>
              <img src={data.guildIcon} width={40} height={40} alt={data.title} draggable={false} />
              <h2>{data.title}</h2>

              <MoreMenu guildId={data.id} />
            </div>
            <div className={bodyStyle}>{data.body}</div>
          </div>
          <GuildPeopleList members={data.members} leader={data.leader} />

          <div className={guildPreviewStyle}>
            <GitanimalsGuild guildId={data.id} />
          </div>
          <CopyGuildImgButton guildId={data.id} />
        </div>
      </GuildSliderContainer>
    </>
  );
}

const guildPreviewStyle = cn(
  'aspect-[1/0.5] w-full rounded-lg overflow-hidden',
  '[&_img]:w-full [&_img]:h-full'
);

const topStyle = cn(
  'flex gap-2 items-center justify-end',
  '[&>*]:h-10 w-full mb-4'
);

const containerStyle = cn(
  'flex flex-col gap-8 p-10 rounded-2xl',
  'bg-white/10 backdrop-blur-[7px]'
);

const titleStyle = cn(
  'flex items-center gap-4',
  'font-product text-glyph-36 font-bold text-white',
  '[&_img]:rounded-lg',
  '[&_h2]:flex-1'
);

const bodyStyle = cn(
  'font-product text-glyph-16 text-white/75 mt-3'
);

const buttonWrapperStyle = cn(
  'flex items-center justify-center',
  'w-10 h-10 bg-white/25 rounded-[10px]'
);
