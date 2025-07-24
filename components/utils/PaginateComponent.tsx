import React, { useCallback } from "react";
import { Pagination } from "@heroui/pagination";

import usePaginationQueryParams from "@/hooks/utils/usePaginationQueryParams";

type Props = {
  page: number;
  totalPages: number;
};

export default function PaginateComponent({ page, totalPages }: Props) {
  const { setOffset } = usePaginationQueryParams();

  // Using useCallback to memoize the handlePageChange function.
  // This prevents unnecessary re-renders of the Pagination component
  // if its other props remain the same.
  const handlePageChange = useCallback(
    (newPage: number) => {
      let offset = (newPage - 1) * 10;

      setOffset(offset);
    },
    [setOffset],
  );

  return totalPages > 0 ? (
    <div className="flex max-w-content justify-center">
      <Pagination
        isCompact
        loop
        showControls
        showShadow
        color="primary"
        initialPage={1}
        page={page}
        total={totalPages}
        onChange={handlePageChange} // Pass the memoized function
      />
    </div>
  ) : null;
}
