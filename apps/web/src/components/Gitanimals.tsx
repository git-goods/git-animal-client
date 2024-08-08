/* eslint-disable @next/next/no-img-element */

import { useUser } from '@/store/user';

interface GitanimalsLineProps {
  sizes?: [number, number];
  petId?: string;
}

export function GitanimalsLine({ petId, sizes = [600, 120] }: GitanimalsLineProps) {
  const { username } = useUser();

  const pet = petId ? `?pet-id=${petId}` : '';

  return (
    <a href="https://github.com/devxb/gitanimals">
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
<a href="https://github.com/devxb/gitanimals">
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
  const { username } = useUser();
  return (
    <a href="https://github.com/devxb/gitanimals">
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
  return `<a href="https://github.com/devxb/gitanimals">
<img
  src="https://render.gitanimals.org/farms/${username}"
  width="${sizes[0]}"
  height="${sizes[1]}"
/>
</a>`;
};
