import { css } from '_panda/css';

import type { PaginationSchema } from '@/schema/pagination';

function Pagination(props: { currentPage: number; onSetPage: (page: number) => void } & PaginationSchema) {
  const getPaginationGroup = () => {
    const start = Math.floor(props.currentPage / 10) * 10;
    return new Array(10)
      .fill(undefined)
      .map((_, idx) => start + idx)
      .filter((page) => page < props.totalPages);
  };

  return (
    <div className={paginationContainerStyle}>
      <button disabled={props.prevPage === null} onClick={() => props.onSetPage(props.prevPage || 0)}>
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
    </div>
  );
}

export default Pagination;

const paginationContainerStyle = css({
  color: '#000',
  textAlign: 'center',
  fontSize: '10px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%' /* 14px */,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  marginTop: '8px',
  '& button': {
    minWidth: '15px',
    height: '26px',
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
