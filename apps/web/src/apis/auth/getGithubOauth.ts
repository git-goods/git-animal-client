// TODO : fetch를 내부 API를 불러오는 instance로 교체

/**
 * 내부 Next API Handler를 호출하여 Github OAuth URL을 가져옵니다.
 * @returns Github OAuth URL
 */
export const getGithubOauthUrl = async () => {
  const res = await fetch('/api/oauth');
  const data = await res.json();

  return data.url;
};
