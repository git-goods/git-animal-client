const GUILD = {
  LIST: () => '/guild',
  MAIN: (id: string) => `/guild/${id}`,
  DETAIL: (id: string) => `/guild/detail/${id}`,
  JOIN: (id: string) => `/guild/detail/${id}/join`,
};

export const ROUTE = {
  HOME: () => '/',
  GUILD,
};

export const ORIGIN_URL = 'https://www.gitanimals.org/en_US';
export const USER_GITHUB_URL = (username: string) => `https://github.com/${username}`;
