import { queryOptions } from '@tanstack/react-query';

import { checkUserUpvote, getAllUpvotes, getUpvoteCount } from './feedback';

export const LABORATORY_FEEDBACK_QUERY_KEYS = {
  all: ['laboratory-upvote'] as const,
  count: ['laboratory-upvote', 'count'] as const,
  userCheck: (userId: string) => ['laboratory-upvote', 'user', userId] as const,
};

/**
 * Query options for checking if user has upvoted
 */
const checkUserUpvoteOptions = (userId: string) =>
  queryOptions({
    queryKey: LABORATORY_FEEDBACK_QUERY_KEYS.userCheck(userId),
    queryFn: () => checkUserUpvote(userId),
    enabled: !!userId,
  });

/**
 * Query options for getting all laboratory upvotes
 */
const getAllUpvotesOptions = () =>
  queryOptions({
    queryKey: LABORATORY_FEEDBACK_QUERY_KEYS.all,
    queryFn: getAllUpvotes,
  });

/**
 * Query options for getting upvote count
 */
const getUpvoteCountOptions = () =>
  queryOptions({
    queryKey: LABORATORY_FEEDBACK_QUERY_KEYS.count,
    queryFn: getUpvoteCount,
  });

export const upvoteQueryOptions = {
  checkUserUpvote: checkUserUpvoteOptions,
  getAllUpvotes: getAllUpvotesOptions,
  getUpvoteCount: getUpvoteCountOptions,
};
