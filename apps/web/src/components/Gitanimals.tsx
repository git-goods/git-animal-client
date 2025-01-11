'use client';

/* eslint-disable @next/next/no-img-element */

import { useClientUser } from '@/utils/clientAuth';

const GITANIMALS_URL = 'https://www.gitanimals.org/en_US';

const getLink = (props: { username: string; type: 'farm' | 'line' }) => {
  return `${GITANIMALS_URL}?utm_medium=image&utm_source=${props.username}&utm_content=${props.type}`;
};

interface GitanimalsLineProps {
  sizes?: [number, number];
  petId?: string | null;
}

export function GitanimalsLine({ petId, sizes = [600, 120] }: GitanimalsLineProps) {
  const { name: username } = useClientUser();

  const pet = petId ? `?pet-id=${petId}` : '';

  return (
    <a href={getLink({ username, type: 'line' })}>
      <img
        src={`https://render.gitanimals.org/lines/${username}${pet}`}
        width={sizes[0]}
        height={sizes[1]}
        alt="gitanimals"
      />
    </a>
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
    src="https://render.gitanimals.org/lines/${username}${pet}"
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
}

export function GitanimalsFarm({ sizes = [600, 300], imageKey }: FarmImageProps) {
  const { name: username } = useClientUser();
  return (
    <a href={getLink({ username, type: 'farm' })}>
      <img
        src={`https://render.gitanimals.org/farms/${username}?${imageKey}`}
        width={sizes[0]}
        height={sizes[1]}
        alt="preview farm"
        style={{
          backgroundColor: '#fff',
        }}
      />
    </a>
  );
}

interface FarmStringProps extends GitanimalsFarmProps {
  username: string;
}

export const getGitanimalsFarmString = ({ username, sizes = [600, 300] }: FarmStringProps) => {
  return `<a href="${getLink({ username, type: 'farm' })}">
<img
  src="https://render.gitanimals.org/farms/${username}"
  width="${sizes[0]}"
  height="${sizes[1]}"
/>
</a>`;
};

export function GitanimalsGuild({ guildId }: { guildId: string }) {
  return <img src={`https://render.gitanimals.org/guilds/${guildId}/draw`} alt="gitanimals" />;
}

export const getGuildString = ({ guildId, sizes = [600, 300] }: { guildId: string } & GitanimalsFarmProps) => {
  return `<a href="https://www.gitanimals.org/">
      <img
        src="https://render.gitanimals.org/guilds/${guildId}/draw"
        width="${sizes[0]}"
        height="${sizes[1]}"
        alt="gitanimals"
      />
    </a>`;
};
