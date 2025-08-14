import { useQueryState } from "nuqs";
import { createLoader, parseAsBoolean } from "nuqs/server";

const useVariantDetailsParam = () => {
  const [openVariantDetails, setOpenVariantDetails] = useQueryState(
    "openVariantDetails",
    {
      parse: Boolean,
      defaultValue: false,
    },
  );

  return {
    openVariantDetails,
    setOpenVariantDetails,
  };
};

export const loadIDParam = createLoader({
  openVariantDetails: parseAsBoolean,
});

export default useVariantDetailsParam;
