/* eslint-disable @next/next/no-img-element */
interface GitanimalsProps {
  username: string;
  sizes?: [number, number];
}

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
        src={"https://render.gitanimals.org/lines/${username}${pet}"}
        width={${sizes[0]}}
        height={${sizes[1]}}
      />
    </a>
  `;
};

interface GitanimalsFarmProps {
  sizes?: [number, number];
}

export function GitanimalsFarm({ sizes = [600, 300] }: GitanimalsFarmProps) {
  const { username } = useUser();
  return (
    <a href="https://github.com/devxb/gitanimals">
      <img
        src={`https://render.gitanimals.org/farms/${username}`}
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

export const getGitanimalsFarmString = ({
  username,
  sizes = [600, 300],
}: { username: string } & GitanimalsFarmProps) => {
  return `<a href="https://github.com/devxb/gitanimals">
      <img
        src={"https://render.gitanimals.org/farms/${username}"}
        width={${sizes[0]}}
        height={${sizes[1]}}
      />
    </a>`;
};
