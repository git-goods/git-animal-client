const GUILD = {
  LIST: () => '/guild',
  MAIN: (id: string) => `/guild/${id}`,
  DETAIL: (id: string) => `/guild/detail/${id}`,
  JOIN: (id: string) => `/guild/detail/${id}/join`,
};

const QUIZ = {
  MAIN: () => '/quiz',
  CREATE: () => '/quiz/create',
  SOLVE: () => '/quiz/solve',
};

export const ROUTE = {
  GUILD,
  QUIZ,
};

export const ORIGIN_URL = 'https://www.gitanimals.org/en_US';
export const USER_GITHUB_URL = (username: string) => `https://github.com/${username}`;
