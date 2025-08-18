import { useQueryState } from "nuqs";

const useVariantEditMode = () => {
  const [variantEditMode, setVariantEditMode] = useQueryState(
    "variantEditMode",
    {
      parse: Boolean,
      defaultValue: false,
    },
  );

  return {
    variantEditMode,
    setVariantEditMode,
  };
};

export default useVariantEditMode;
