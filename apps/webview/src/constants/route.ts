export const ROUTE = {
  HOME: {
    ROOT: () => '/',
    PERSONA: () => '/persona',
  },
  AUTH: {
    LOGIN: () => '/auth',
    ERROR: () => '/auth/error',
  },
};

export const ORIGIN_URL = 'https://www.gitanimals.org/en_US';
export const USER_GITHUB_URL = (username: string) => `https://github.com/${username}`;
