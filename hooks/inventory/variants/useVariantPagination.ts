import { useQueryState } from "nuqs";
import { createLoader, parseAsInteger } from "nuqs/server";

const useVariantPagination = () => {
  const [offset, setOffset] = useQueryState("variantOffset", {
    parse: Number,
    defaultValue: 0,
  });
  const [limit, setLimit] = useQueryState("variantLimit", {
    parse: Number,
    defaultValue: 10,
  });

  return {
    offset,
    limit,
    setOffset,
    setLimit,
  };
};

export const loader = createLoader({
  offset: parseAsInteger.withDefault(0),
  limit: parseAsInteger.withDefault(10),
});

export default useVariantPagination;
