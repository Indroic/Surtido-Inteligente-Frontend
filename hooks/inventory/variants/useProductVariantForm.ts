import { DefaultValues } from "react-hook-form";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import { ProductVariantInterface } from "@/types/products";

const defaultProductValues: DefaultValues<ProductVariantInterface> = {
  name: "",
};

export default function useProductVariantForm(
  {
    defaultValues = defaultProductValues,
  }: BaseFormHookProps<ProductVariantInterface> = {
    defaultValues: undefined,
  },
) {
  const baseHook = useBaseFormHook<ProductVariantInterface>({
    defaultValues,
  });

  return {
    ...baseHook,
  };
}
