import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { createComment } from './useCreateComment';
import { postIssue } from './usePostIssue';

export interface PostFeedbackRequest {
  title: string;
  body: string;
  assignees?: string[];
  labels?: string[];
  username?: string;
}

interface PostFeedbackResponse {
  comments_url: string;
  url: string;
  html_url: string;
}

export async function postFeedback(request: PostFeedbackRequest): Promise<PostFeedbackResponse> {
  const issueData = await postIssue(request);
  if (request.username) {
    const commentBody = `@${request.username}\nThanks for reporting the issue!`;

    await createComment({ issueNumber: issueData.number, body: commentBody });
  }

  return issueData;
}

export const usePostFeedback = (options?: UseMutationOptions<PostFeedbackResponse, unknown, PostFeedbackRequest>) =>
  useMutation({ mutationFn: postFeedback, ...options });
