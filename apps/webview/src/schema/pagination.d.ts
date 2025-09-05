/**
 * Pagination schema
 * @typedef PaginationSchema
 * @property {string} [pageNumber] -  page-number에 해당하는 page를 조회합니다. (첫번째 page-number는 0 이며, 아무것도 입력하지 않을시, 0으로 초기화 됩니다.)
 *  @property {number} [count] - product를 count개 조회합니다. 입력하지 않을 경우, 8개를 조회합니다.
 */
export interface PaginationRequestSchema {
  pageNumber?: number;
  count?: number;
}

export interface PaginationSchema {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}
