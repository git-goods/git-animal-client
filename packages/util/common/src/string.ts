/**
 * 스네이크 케이스 문자열을 타이틀 케이스로 변환합니다.
 * @param str - 변환할 스네이크 케이스 문자열
 * @returns 타이틀 케이스로 변환된 문자열
 * @example
 * snakeToTitleCase('SUMI_MA') => 'Sumi Ma'
 */
export const snakeToTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
