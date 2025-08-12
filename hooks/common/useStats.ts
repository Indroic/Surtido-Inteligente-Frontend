import { useQueryState } from "nuqs";
import { createLoader, parseAsBoolean } from "nuqs/server";

const useGetStats = () => {
  const [getStats, setGetStats] = useQueryState("getstats", {
    parse: Boolean,
  });

  return {
    getStats,
    setGetStats,
  };
};

export const loadGetStats = createLoader({
  getstats: parseAsBoolean,
});

export default useGetStats;
