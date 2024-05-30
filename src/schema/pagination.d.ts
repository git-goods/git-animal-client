/**
 * Pagination schema
 * @typedef PaginationSchema
 * @property {string} [lastId] -  last-id를 입력하면, lastId이후의 products들을 조회합니다. (lastId에 해당하는 products는 포함하지 않습니다.) 만약, 입력하지 않을 경우, 가장 처음 products부터 count개 반환합니다.
 *  @property {number} [count] -  last-id 이후의 product를 count개 조회합니다. 입력하지 않을 경우, 8개를 조회합니다.
 */
export interface PaginationSchema {
  lastId?: string;
  count?: number;
}
