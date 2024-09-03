import { requestOctokit } from './core';

export interface CreateCommentRequest {
  issueNumber: number;
  body: string;
}

export async function createComment(request: CreateCommentRequest) {
  return requestOctokit('POST', `/repos/git-goods/gitanimals/issues/${request.issueNumber}/comments`, {
    issue_number: request.issueNumber,
    body: request.body,
  });
}
