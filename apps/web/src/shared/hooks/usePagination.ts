import { useState } from 'react';

function usePagination({ initPage = 0, totalPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(0);

  const onPrev = () => {
    if (currentPage === 0) return;
    setCurrentPage((prev) => prev - 1);
  };

  const onNext = () => {
    if (currentPage === totalPage - 1) return;
    setCurrentPage((prev) => prev + 1);
  };

  return {
    currentPage,
    onPrev,
    onNext,
  };
}

export default usePagination;
