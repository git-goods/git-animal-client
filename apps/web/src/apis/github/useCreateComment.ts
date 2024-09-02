import { octokit } from './core';

export interface CreateCommentRequest {
  issueNumber: number;
  body: string;
}

export async function createComment(request: CreateCommentRequest) {
  return await octokit.request(`POST /repos/git-goods/gitanimals/issues/${request.issueNumber}/comments`, {
    owner: 'git-good-w',
    repo: 'gitanimals',
    issue_number: request.issueNumber,
    body: request.body,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
}
