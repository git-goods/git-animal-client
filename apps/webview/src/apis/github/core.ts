import { Octokit } from '@octokit/core';

const ISSUE_TOKEN = process.env.NEXT_PUBLIC_ISSUE_TOKEN;

const octokit = new Octokit({
  auth: ISSUE_TOKEN,
});

const OCTOKIT_BASE_INFO = {
  owner: 'git-good-w',
  repo: 'gitanimals',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
  },
} as const;

export const requestOctokit = async (method: 'GET' | 'POST', url: string, data?: object) => {
  const response = await octokit.request(`${method} ${url}`, {
    ...OCTOKIT_BASE_INFO,
    ...data,
  });

  return response.data;
};
