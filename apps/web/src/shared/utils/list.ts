/**
 * @description : list에서 key에 해당하는 값이 중복되는 것을 필터링 (같은 key가 하나만 남도록)
 * @param list  : T[]
 * @param key : keyof T, key가 겹치면 필터링
 * @returns
 */
export const getUniqueFilterList = <T>(list: T[], key: keyof T) => {
  const typeSet = new Set();
  const filteredList = list.filter((item) => {
    const isExist = typeSet.has(item[key]);
    typeSet.add(item[key]);
    return !isExist;
  });

  return filteredList;
};
