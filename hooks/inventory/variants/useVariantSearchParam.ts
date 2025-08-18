import { useQueryState } from "nuqs";
import { parseAsString, createLoader } from "nuqs/server";

export const useSearchVariantParam = () => {
  const key = "searchVariant";
  const [search, setSearch] = useQueryState(key, { defaultValue: "" });

  return {
    search,
    setSearch,
    key,
  };
};

export const loader = createLoader({ searchVariant: parseAsString });
