const GAME = {
  QUIZ: {
    MAIN: () => '/game/quiz',
    CREATE: () => '/game/quiz/create',
    SOLVE: () => '/game/quiz/solve',
  },
};

export const ROUTE = {
  HOME: () => '/',
  AUTH: {
    LOGIN: () => '/auth',
    ERROR: () => '/auth/error',
  },
  GAME,
};

export const ORIGIN_URL = 'https://www.gitanimals.org/en_US';
export const USER_GITHUB_URL = (username: string) => `https://github.com/${username}`;
