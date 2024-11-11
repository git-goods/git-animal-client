// maintainer
export const SERVICE_MAINTAINER = ['sumi-0011', 'hyesungoh', 'git-good-w', 'devxb'];

// issue
export const GITHUB_ISSUE_TYPE = {
  BUG: 'bug',
  ENHANCEMENT: 'enhancement',
  QUESTION: 'question',
} as const;

export type GithubIssueType = (typeof GITHUB_ISSUE_TYPE)[keyof typeof GITHUB_ISSUE_TYPE];
