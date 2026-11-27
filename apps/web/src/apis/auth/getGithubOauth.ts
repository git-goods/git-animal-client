// TODO : fetch를 내부 API를 불러오는 instance로 교체

// client 에서만 쓴다.
export const getGithubOauthUrl = async () => {
  const res = await fetch('/api/oauth');
  const data = await res.json();

  window.location.assign(data.url);
};
