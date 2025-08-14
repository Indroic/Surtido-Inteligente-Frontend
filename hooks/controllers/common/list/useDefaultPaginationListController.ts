import usePaginationQueryParams from "@/hooks/utils/usePaginationQueryParams";
import { PaginationController } from "@/types/list";

const useDefaultPaginationListController: PaginationController = () => {
  const { offset, limit, setOffset, setLimit } = usePaginationQueryParams();

  return {
    offset,
    limit,
    setOffset,
    setLimit,
    offsetKey: "offset",
    limitKey: "limit",
  };
};

export default useDefaultPaginationListController;
