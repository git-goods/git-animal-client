import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { requestOctokit } from './core';

export interface PostIssueRequest {
  title: string;
  body: string;
  assignees?: string[];
  labels?: string[];
}

interface PostIssueResponse {
  comments_url: string;
  number: number;
  url: string;
  html_url: string;
}

export async function postIssue(request: PostIssueRequest): Promise<PostIssueResponse> {
  return requestOctokit('POST', '/repos/git-goods/gitanimals/issues', {
    title: request.title,
    body: request.body,
    assignees: request.assignees,
    labels: request.labels,
  });
}

export const usePostIssue = (options?: UseMutationOptions<PostIssueResponse, unknown, PostIssueRequest>) =>
  useMutation({ mutationFn: postIssue, ...options });
