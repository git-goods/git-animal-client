let idCounter = 0;
/**
 * 고유한 id 값을 생성하는 함수
 *
 * @param prefix
 * @returns id
 */
export const generateId = (prefix = 'depromeet-id-') => {
  idCounter = idCounter + 1;

  return `${prefix}${idCounter}`;
};
