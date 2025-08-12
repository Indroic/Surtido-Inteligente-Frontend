import { useQueryState } from "nuqs";
import { createLoader, parseAsString } from "nuqs/server";

const useIDParam = () => {
  const [id, setID] = useQueryState("id", {
    parse: String,
    defaultValue: null,
  });

  return {
    id,
    setID,
  };
};

export const loadIDParam = createLoader({
  id: parseAsString,
});

export default useIDParam;
