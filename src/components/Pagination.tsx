import styled from 'styled-components';

import type { PaginationSchema } from '@/schema/pagination';

function Pagination(props: { currentPage: number; onSetPage: (page: number) => void } & PaginationSchema) {
  const getPaginationGroup = () => {
    const start = Math.floor(props.currentPage / 10) * 10;
    return new Array(10)
      .fill(undefined)
      .map((_, idx) => start + idx)
      .filter((page) => page <= props.totalPages);
  };

  return (
    <PaginationContainer>
      <button disabled={!props.prevPage} onClick={() => props.prevPage && props.onSetPage(props.prevPage)}>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" width="4" height="4" fill="#141414" />
          <rect x="4" y="4" width="4" height="4" fill="#141414" />
          <rect y="8" width="4" height="4" fill="#141414" />
          <rect x="4" y="12" width="4" height="4" fill="#141414" />
          <rect x="8" y="16" width="4" height="4" fill="#141414" />
        </svg>
      </button>
      {getPaginationGroup().map((i) => (
        <button
          key={i}
          onClick={() => props.onSetPage(i)}
          style={{ background: props.currentPage === i ? '#00000026' : 'transparent' }}
        >
          {i + 1}
        </button>
      ))}
      <button disabled={!props.nextPage} onClick={() => props.nextPage && props.onSetPage(props.nextPage)}>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="4" height="4" transform="matrix(-1 0 0 1 4 0)" fill="#141414" />
          <rect width="4" height="4" transform="matrix(-1 0 0 1 8 4)" fill="#141414" />
          <rect width="4" height="4" transform="matrix(-1 0 0 1 12 8)" fill="#141414" />
          <rect width="4" height="4" transform="matrix(-1 0 0 1 8 12)" fill="#141414" />
          <rect width="4" height="4" transform="matrix(-1 0 0 1 4 16)" fill="#141414" />
        </svg>
      </button>
    </PaginationContainer>
  );
}

export default Pagination;

const PaginationContainer = styled.div`
  color: #000;
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 14px */

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 14px;

  button {
    min-width: 15px;
    height: 26px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;
