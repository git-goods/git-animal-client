/* eslint-disable @next/next/no-img-element */
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { center, flex } from '_panda/patterns';
import { getGuildById } from '@gitanimals/api';
import { BannerPetSelectMedium, Button } from '@gitanimals/ui-panda';
import { SearchIcon, UsersRoundIcon } from 'lucide-react';

import { GitanimalsGuild } from '@/components/Gitanimals';
import { GuildMemeberSlider } from '@/components/Guild/MemeberSlider';
import { Link } from '@/i18n/routing';
import { getPersonaImage } from '@/utils/image';

import { CopyGuildImgButton } from './CopyGuildImgButton';
import { GuildSliderContainer } from './GuildSliderContainer';
import { MoreMenu } from './MoreMenu';

export default async function GuildPage({ params }: { params: { id: string } }) {
  const data = await getGuildById({ guildId: params.id });

  return (
    <>
      <div className={topStyle}>
        <Link href="/guild?search=true" style={{ flex: 1 }} className={buttonWrapperStyle}>
          <SearchIcon color="rgba(255, 255, 255, 0.5)" width={20} height={20} />
        </Link>

        <Link href="/guild/create">
          <Button minWidth="126px" size="m" px="20px">
            Create Guild
          </Button>
        </Link>
      </div>
      <GuildSliderContainer guildId={data.id}>
        <div className={containerStyle}>
          <div>
            <div className={titleStyle}>
              <img src={data.guildIcon} width={40} height={40} alt={data.title} />
              <h2>{data.title}</h2>

              <MoreMenu guildId={data.id} />
            </div>
            <div className={bodyStyle}>{data.body}</div>
          </div>
          <div className={listStyle}>
            <div className={leaderStyle}>
              <p> Leader</p>
              <BannerPetSelectMedium
                name={data.leader.name}
                count={data.leader.contributions}
                image={getPersonaImage(data.leader.personaType)}
                status="gradient"
              />
            </div>
            <div className={membersStyle}>
              <Flex mb="1" justifyContent="space-between">
                <p>Members</p>
                <Flex gap="6px" alignItems="center">
                  <UsersRoundIcon size={16} color="#FFFFFF80" />
                  <span>{data.members.length}/ 15</span>
                </Flex>
              </Flex>
              <GuildMemeberSlider members={data.members} />
            </div>
          </div>
          <div className={guildPreviewStyle}>
            <GitanimalsGuild guildId={data.id} />
          </div>
          <CopyGuildImgButton guildId={data.id} />
        </div>
      </GuildSliderContainer>
    </>
  );
}

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

const topStyle = flex({
  gap: 2,
  alignItems: 'center',
  '& > *': {
    height: '40px',
  },
  width: '100%',
  mb: 4,
});
const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 10,
  borderRadius: '16px',
  background: 'white.white_10',
  backdropFilter: 'blur(7px)',
});

const listStyle = flex({
  gap: 4,
  overflowX: 'hidden',
  minH: '180px',
  color: 'white.white_100',
});

const leaderStyle = css({
  '& > p': {
    mb: 1,
  },
});

const membersStyle = css({
  overflow: 'hidden',
  flex: 1,
});

const titleStyle = flex({
  alignItems: 'center',
  gap: 4,
  textStyle: 'glyph36.bold',
  color: 'white.white_100',
  '& img': {
    borderRadius: '8px',
  },
  '& h2': {
    flex: 1,
  },
});

const bodyStyle = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_75',
  mt: 3,
});
const buttonWrapperStyle = center({
  w: '36px',
  h: '36px',
  backgroundColor: 'white.white_25',
  borderRadius: '10px',
});
