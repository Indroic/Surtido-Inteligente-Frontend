import { useQueryState } from "nuqs";
import { parseAsString, createLoader } from "nuqs/server";

export const useSearchQueryParams = () => {
  const [search, setSearch] = useQueryState("search", {
    parse: String,
  });

  return {
    search,
    setSearch,
  };
};

export const loader = createLoader({ search: parseAsString });
