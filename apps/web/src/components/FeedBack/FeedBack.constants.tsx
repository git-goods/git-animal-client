const GITHUB_ISSUE_TYPE = ['bug', 'enhancement', 'question'] as const;
type GithubIssueType = (typeof GITHUB_ISSUE_TYPE)[number];

export const ISSUE_LABEL: Record<
  string,
  {
    label: string;
    color: string;
    relations?: GithubIssueType[];
  }
> = {
  BUG: {
    label: 'bug',
    color: '#FFDBEE',
    relations: ['bug'],
  },
  REQUEST: {
    label: 'request',
    color: '#C4F2F7',
    relations: ['enhancement'],
  },
  ETC: {
    label: 'etc',
    color: '#FFCC91',
  },
} as const;

export const MAINTAINER = ['sumi-0011', 'hyesungoh', 'devxb'];
