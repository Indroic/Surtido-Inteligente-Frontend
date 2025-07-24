import { useQueryState } from "nuqs";
import { createLoader, parseAsInteger } from "nuqs/server";

const usePaginationQueryParams = () => {
  const [offset, setOffset] = useQueryState("offset", {
    parse: Number,
    defaultValue: 0,
  });
  const [limit, setLimit] = useQueryState("limit", {
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

export default usePaginationQueryParams;
