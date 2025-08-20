import { css } from '_panda/css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        <ChevronLeft color="#B5B8C0" />
      </button>

      {getPaginationGroup().map((i) => (
        <button
          key={i}
          onClick={() => props.onSetPage(i)}
          className={props.currentPage === i ? selectedCss : nonSelectedCss}
        >
          {i + 1}
        </button>
      ))}

      <button disabled={!props.nextPage} onClick={() => props.nextPage && props.onSetPage(props.nextPage)}>
        <ChevronRight color="#B5B8C0" />
      </button>
    </div>
  );
}

export default Pagination;

const paginationContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',

  '& button': {
    minWidth: '15px',
    height: '26px',
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const nonSelectedCss = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_50',
});

const selectedCss = css({
  textStyle: 'glyph16.bold',
  color: 'white.white_100',
});
