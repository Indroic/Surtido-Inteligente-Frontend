import { useSearchQueryParams } from "@/hooks/utils/useSearchQueryParams";
import { SearchController } from "@/types/list";

const useDefaultSearchListController: SearchController = () => {
  const { search, setSearch, key: searchKey } = useSearchQueryParams();

  return {
    search,
    setSearch,
    searchKey,
  };
};

export default useDefaultSearchListController;
