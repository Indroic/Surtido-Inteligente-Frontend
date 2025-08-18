import { useSearchVariantParam } from "@/hooks/inventory/variants/useVariantSearchParam";
import { SearchController } from "@/types/list";

const useVariantSearchController: SearchController = () => {
  const { search, setSearch, key: searchKey } = useSearchVariantParam();

  return {
    search,
    setSearch,
    searchKey,
  };
};

export default useVariantSearchController;
