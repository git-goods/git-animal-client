/* eslint-disable @next/next/no-img-element */

export function GitanimalsLine({ username, sizes = [600, 120] }: { username: string; sizes?: [number, number] }) {
  return (
    <a href="https://github.com/devxb/gitanimals">
      <img
        src={`https://render.gitanimals.org/lines/${username} `}
        width={sizes[0]}
        height={sizes[1]}
        alt="gitanimals"
      />
    </a>
  );
}

export function GitanimalsFarm({ username, sizes = [600, 300] }: { username: string; sizes?: [number, number] }) {
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
