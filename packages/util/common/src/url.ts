export function isExternalLink(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
}

/**
 * 기존 쿼리 파라미터에 새로운 키-값 쌍을 추가하거나 업데이트하여 새로운 URL 쿼리 문자열을 생성합니다.
 * @param searchParams 기존 쿼리 파라미터 (URLSearchParams 객체)
 * @param key 추가하거나 업데이트할 쿼리 파라미터의 키
 * @param value 설정할 값 (옵션, 제공되지 않으면 빈 문자열로 설정됨)
 * @returns 업데이트된 쿼리 파라미터 문자열
 * @example
 * const searchParams = new URLSearchParams();
 * searchParams.set('type', 'farm-type');
 * const updatedSearchParams = appendOrUpdateUrlSearchParam(searchParams, 'type', '1-type');
 * // 결과: 'type=1-type'
 */
export const appendOrUpdateUrlSearchParam = (searchParams: URLSearchParams, key: string, value?: string) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(key, value ?? '');
  return params.toString();
};

/**
 * 주어진 검색 매개변수에 새로운 키-값 쌍을 추가하거나 기존 값을 업데이트합니다.
 * @param searchParams 기존 검색 매개변수 (Record<string, string> 형태)
 * @param key 추가하거나 업데이트할 매개변수의 키
 * @param value 설정할 값 (옵션, 제공되지 않으면 빈 문자열로 설정됨)
 * @returns 업데이트된 검색 매개변수 문자열
 * @example
 * const searchParams = {
 *   type: 'farm-type',
 * };
 * const updatedSearchParams = updateUrlSearchParams(searchParams, 'type', '1-type');
 * // 결과: 'type=1-type'
 */
export const updateUrlSearchParams = (searchParams: Record<string, string>, key: string, value?: string): string => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value ?? '');
  return params.toString();
};

export const getNewUrl = ({
  baseUrl,
  newParams,
  oldParams = {},
}: {
  baseUrl: string;
  oldParams?: Record<string, unknown>;
  newParams: Record<string, unknown>;
}) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries({ ...oldParams, ...newParams })) {
    params.append(key, String(value));
  }

  return `${baseUrl}?${params.toString()}`;
};
