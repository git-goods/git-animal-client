'use client';

/* eslint-disable @next/next/no-img-element */

import { cn } from '@gitanimals/ui-tailwind';

import { RENDER_URL } from '@/constants/outlink';
import { ORIGIN_URL } from '@/constants/route';
import { useClientUser } from '@/utils/clientAuth';

const getLink = (props: { username: string; type: 'farm' | 'line' }) => {
  return `${ORIGIN_URL}?utm_medium=image&utm_source=${props.username}&utm_content=${props.type}`;
};

interface GitanimalsLineProps {
  sizes?: [number, number];
  petId?: string | null;
}

export function GitanimalsLine({ petId, sizes = [600, 120] }: GitanimalsLineProps) {
  const { name: username } = useClientUser();

  const pet = petId ? `?pet-id=${petId}` : '';

  return (
    <img
      src={`${RENDER_URL}/lines/${username}${pet}`}
      width={sizes[0]}
      height={sizes[1]}
      alt="gitanimals"
      draggable={false}
    />
  );
}

export const getGitanimalsLineString = ({
  username,
  petId,
  sizes = [600, 120],
}: { username: string } & GitanimalsLineProps) => {
  const pet = petId ? `?pet-id=${petId}` : '';

  return `
<a href="${getLink({ username, type: 'line' })}">
  <img
    src="${RENDER_URL}/lines/${username}${pet}"
    width="${sizes[0]}"
    height="${sizes[1]}"
  />
</a>
  `;
};

interface GitanimalsFarmProps {
  sizes?: [number, number];
}

interface FarmImageProps extends GitanimalsFarmProps {
  /**
   * @description 이미지를 최신화하기 위함
   */
  imageKey?: string;
  className?: string;
}

export function GitanimalsFarm({ imageKey, className }: FarmImageProps) {
  const { name: username } = useClientUser();
  return (
    <img
      src={`${RENDER_URL}/farms/${username}?${imageKey}`}
      width={600}
      height={300}
      alt="preview farm"
      className={cn('bg-[#fff]', className)}
      draggable={false}
    />
  );
}

interface FarmStringProps extends GitanimalsFarmProps {
  username: string;
}

export const getGitanimalsFarmString = ({ username, sizes = [600, 300] }: FarmStringProps) => {
  return `<a href="${getLink({ username, type: 'farm' })}">
<img
  src="${RENDER_URL}/farms/${username}"
  width="${sizes[0]}"
  height="${sizes[1]}"
/>
</a>`;
};

export function GitanimalsGuild({ guildId }: { guildId: string }) {
  return <img src={`${RENDER_URL}/guilds/${guildId}/draw`} alt="gitanimals" draggable={false} />;
}

export const getGuildString = ({ guildId, sizes = [600, 300] }: { guildId: string } & GitanimalsFarmProps) => {
  return `<a href="https://www.gitanimals.org/">
      <img
        src="${RENDER_URL}/guilds/${guildId}/draw"
        width="${sizes[0]}"
        height="${sizes[1]}"
        alt="gitanimals"
      />
    </a>`;
};
