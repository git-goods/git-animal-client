import { css } from '_panda/css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Link } from '@/i18n/routing';
import type { PaginationSchema } from '@/schema/pagination';

export function PaginationServer(props: { generateMoveLink: (props: { page: number }) => string } & PaginationSchema) {
  const getPaginationGroup = () => {
    const start = Math.floor(props.currentPage / 10) * 10;
    return new Array(10)
      .fill(undefined)
      .map((_, idx) => start + idx)
      .filter((page) => page < props.totalPages);
  };

  if (props.totalPages <= 1) return null;

  return (
    <div className={paginationContainerStyle}>
      <Link
        href={props.generateMoveLink({ page: props.prevPage ?? 0 })}
        style={{
          pointerEvents: props.prevPage === null ? 'none' : 'auto',
          cursor: props.prevPage === null ? 'not-allowed' : 'pointer',
        }}
      >
        <ChevronLeft color="#B5B8C0" />
      </Link>

      {getPaginationGroup().map((i) => {
        return (
          <Link
            href={props.generateMoveLink({ page: i })}
            key={i}
            className={props.currentPage === i ? selectedCss : nonSelectedCss}
          >
            {i + 1}
          </Link>
        );
      })}

      <Link
        href={props.generateMoveLink({ page: props.nextPage ?? 0 })}
        style={{
          pointerEvents: props.nextPage === null ? 'none' : 'auto',
          cursor: props.nextPage === null ? 'not-allowed' : 'pointer',
        }}
      >
        <ChevronRight color="#B5B8C0" />
      </Link>
    </div>
  );
}

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
