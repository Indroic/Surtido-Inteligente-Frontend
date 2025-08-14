import React, { useCallback, useRef } from "react";
import { Pagination } from "@heroui/pagination";

import { PaginationController } from "@/types/list";
import useDefaultPaginationListController from "@/hooks/controllers/common/list/useDefaultPaginationListController";

type Props = {
  page: number;
  totalPages: number;
  paginationController?: PaginationController;
};

export default function PaginateComponent({
  page,
  totalPages,
  paginationController = useDefaultPaginationListController,
}: Props) {
  const refPaginationController = useRef(paginationController);
  const { setOffset } = refPaginationController.current();

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
