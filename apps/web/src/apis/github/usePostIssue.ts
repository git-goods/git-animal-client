import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const ISSUE_TOKEN = process.env.NEXT_PUBLIC_ISSUE_TOKEN;
const POST_ISSUE_URL = 'https://api.github.com/repos/git-goods/git-animal-client/issues';

export interface PostIssueRequest {
  title: string;
  body: string;
  assignees?: string[];
  labels?: string[];
}
async function postIssue(request: PostIssueRequest) {
  const response = await fetch(POST_ISSUE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ISSUE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to post issue');
  }

  return response.json();
}

export const usePostIssue = (options?: UseMutationOptions<unknown, unknown, PostIssueRequest>) =>
  useMutation({ mutationFn: postIssue, ...options });
