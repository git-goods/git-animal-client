import { Octokit } from '@octokit/core';

const ISSUE_TOKEN = process.env.NEXT_PUBLIC_ISSUE_TOKEN;

export const octokit = new Octokit({
  auth: ISSUE_TOKEN,
});
