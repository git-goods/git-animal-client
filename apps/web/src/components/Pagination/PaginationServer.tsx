import { cn } from '@gitanimals/ui-tailwind';
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
      {props.prevPage !== null && (
        <Link
          href={props.generateMoveLink({ page: props.prevPage })}
          shallow
          scroll={false}
          style={{
            pointerEvents: props.prevPage === null ? 'none' : 'auto',
            cursor: props.prevPage === null ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronLeft color="#B5B8C0" />
        </Link>
      )}

      {getPaginationGroup().map((i) => {
        return (
          <Link
            href={props.generateMoveLink({ page: i })}
            key={i}
            shallow
            scroll={false}
            className={props.currentPage === i ? selectedCss : nonSelectedCss}
          >
            {i + 1}
          </Link>
        );
      })}

      {props.nextPage !== null && (
        <Link
          href={props.generateMoveLink({ page: props.nextPage })}
          shallow
          scroll={false}
          style={{
            pointerEvents: props.nextPage === null ? 'none' : 'auto',
            cursor: props.nextPage === null ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronRight color="#B5B8C0" />
        </Link>
      )}
    </div>
  );
}

const paginationContainerStyle = cn(
  'flex items-center justify-center gap-1.5',
  '[&_button]:min-w-[15px] [&_button]:h-[26px] [&_button]:rounded [&_button]:inline-flex [&_button]:items-center [&_button]:justify-center'
);

const nonSelectedCss = cn(
  'font-product text-glyph-16 leading-[10px] text-white-white/50'
);

const selectedCss = cn(
  'font-product text-glyph-16 font-bold leading-[10px] text-white-white'
);
