import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@gitanimals/ui-tailwind/utils';

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
    <div className="flex items-center justify-center gap-1.5 [&_button]:inline-flex [&_button]:h-[26px] [&_button]:min-w-[15px] [&_button]:items-center [&_button]:justify-center [&_button]:rounded">
      <button disabled={props.prevPage === null} onClick={() => props.onSetPage(props.prevPage || 0)}>
        <ChevronLeft color="#B5B8C0" />
      </button>

      {getPaginationGroup().map((i) => (
        <button
          key={i}
          onClick={() => props.onSetPage(i)}
          className={cn(
            'font-product text-glyph-16',
            props.currentPage === i ? 'font-bold text-white' : 'font-normal text-white/50',
          )}
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
