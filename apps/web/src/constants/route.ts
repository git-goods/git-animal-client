const GUILD = {
  LIST: () => '/guild',
  MAIN: (id: string) => `/guild/${id}`,
  DETAIL: (id: string) => `/guild/detail/${id}`,
  JOIN: (id: string) => `/guild/detail/${id}/join`,
};

export const ROUTE = {
  GUILD,
};
