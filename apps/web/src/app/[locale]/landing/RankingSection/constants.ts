export const RANKS_TOP_3 = 3;
export const RANKS_PER_PAGE = 5;
export const RANK_OFFSET = RANKS_TOP_3 + 1;

export const getRankStart = (page: number) => page * RANKS_PER_PAGE + RANK_OFFSET;

export const calcTotalPage = (totalCount: number) => {
  if (totalCount <= RANKS_TOP_3) return 0;
  return Math.ceil((totalCount - RANKS_TOP_3) / RANKS_PER_PAGE) - 1;
};
