import { useQueryState } from "nuqs";
import { createLoader, parseAsString } from "nuqs/server";

const useVariantIDParam = () => {
  const [variantID, setVariantID] = useQueryState("variantID", {
    parse: String,
    defaultValue: null,
  });

  return {
    variantID,
    setVariantID,
  };
};

export const loadIDParam = createLoader({
  variantID: parseAsString,
});

export default useVariantIDParam;
