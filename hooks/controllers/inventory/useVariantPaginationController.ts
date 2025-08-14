import useVariantPagination from "@/hooks/inventory/useVariantPagination";
import { PaginationController } from "@/types/list";

const useVariantPaginationController: PaginationController = () => {
  const { offset, limit, setOffset, setLimit } = useVariantPagination();

  return {
    offset,
    limit,
    setOffset,
    setLimit,
    offsetKey: "offset",
    limitKey: "limit",
  };
};

export default useVariantPaginationController;
