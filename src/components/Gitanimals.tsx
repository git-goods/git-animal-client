/* eslint-disable @next/next/no-img-element */

import { useUser } from '@/store/user';

export function GitanimalsLine({ petId, sizes = [600, 120] }: { sizes?: [number, number]; petId?: string }) {
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

export function GitanimalsFarm({ sizes = [600, 300] }: { username: string; sizes?: [number, number] }) {
  const { username } = useUser();
  return (
    <a href="https://github.com/devxb/gitanimals">
      <img
        src={`https://render.gitanimals.org/farms/${username}`}
        width={sizes[0]}
        height={sizes[1]}
        alt="preview farm"
      />
    </a>
  );
}
