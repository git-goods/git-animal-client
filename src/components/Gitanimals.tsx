/* eslint-disable @next/next/no-img-element */
interface GitanimalsProps {
  username: string;
  sizes?: [number, number];
}

export function GitanimalsLine({ username, sizes = [600, 120] }: GitanimalsProps) {
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

export const getGitanimalsLineString = ({ username, sizes = [600, 120] }: GitanimalsProps) => `
  <a href="https://github.com/devxb/gitanimals">
    <img
      src={https://render.gitanimals.org/lines/${username}}
      width={${sizes[0]}}
      height={${sizes[1]}}
    />
  </a>
`;

export function GitanimalsFarm({ username, sizes = [600, 300] }: GitanimalsProps) {
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

export const getGitanimalsFarmString = ({ username, sizes = [600, 300] }: GitanimalsProps) => `
    <a href="https://github.com/devxb/gitanimals">
      <img
        src={https://render.gitanimals.org/farms/${username}}
        width={${sizes[0]}}
        height={${sizes[1]}}
      />
    </a>
`;
