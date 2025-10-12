import { queryOptions } from '@tanstack/react-query';

import { checkUserUpvote, getAllUpvotes, getUpvoteCount } from './feedback';

export const LABORATORY_FEEDBACK_QUERY_KEYS = {
  all: ['laboratory-upvote'] as const,
  byLab: (laboratoryId: string) => ['laboratory-upvote', 'lab', laboratoryId] as const,
  count: (laboratoryId: string) => ['laboratory-upvote', 'count', laboratoryId] as const,
  userCheck: (userId: string, laboratoryId: string) => ['laboratory-upvote', 'user', userId, 'lab', laboratoryId] as const,
};

/**
 * Query options for checking if user has upvoted for a specific laboratory
 */
const checkUserUpvoteOptions = (userId: string, laboratoryId: string) =>
  queryOptions({
    queryKey: LABORATORY_FEEDBACK_QUERY_KEYS.userCheck(userId, laboratoryId),
    queryFn: () => checkUserUpvote(userId, laboratoryId),
    enabled: !!userId && !!laboratoryId,
  });

/**
 * Query options for getting all laboratory upvotes for a specific laboratory
 */
const getAllUpvotesOptions = (laboratoryId: string) =>
  queryOptions({
    queryKey: LABORATORY_FEEDBACK_QUERY_KEYS.byLab(laboratoryId),
    queryFn: () => getAllUpvotes(laboratoryId),
    enabled: !!laboratoryId,
  });

/**
 * Query options for getting upvote count for a specific laboratory
 */
const getUpvoteCountOptions = (laboratoryId: string) =>
  queryOptions({
    queryKey: LABORATORY_FEEDBACK_QUERY_KEYS.count(laboratoryId),
    queryFn: () => getUpvoteCount(laboratoryId),
    enabled: !!laboratoryId,
  });

export const upvoteQueryOptions = {
  checkUserUpvote: checkUserUpvoteOptions,
  getAllUpvotes: getAllUpvotesOptions,
  getUpvoteCount: getUpvoteCountOptions,
};
