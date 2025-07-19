// TODO : fetch를 내부 API를 불러오는 instance로 교체

/**
 * 내부 Next API Handler를 호출하여 Github OAuth URL을 가져오고, 해당 URL로 redirect합니다.
 * client side에서만 사용됩니다.
 */
export const getGithubOauthUrl = async () => {
  const res = await fetch('/api/oauth');
  const data = await res.json();

  window.location.assign(data.url);
};
