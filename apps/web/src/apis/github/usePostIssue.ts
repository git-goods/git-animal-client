import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { octokit } from './core';

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
  const response = await octokit.request('POST /repos/git-goods/gitanimals/issues', {
    owner: 'git-good-w',
    repo: 'gitanimals',
    title: request.title,
    body: request.body,
    assignees: request.assignees,
    labels: request.labels,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  return response.data;
}

export const usePostIssue = (options?: UseMutationOptions<PostIssueResponse, unknown, PostIssueRequest>) =>
  useMutation({ mutationFn: postIssue, ...options });
