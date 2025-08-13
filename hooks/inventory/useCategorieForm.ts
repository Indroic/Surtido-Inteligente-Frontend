import { DefaultValues } from "react-hook-form";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import { CategoryInterface } from "@/types/products";

const defaultProductValues: DefaultValues<CategoryInterface> = {
  name: "",
};

export default function useCategoryForm(
  {
    defaultValues = defaultProductValues,
  }: BaseFormHookProps<CategoryInterface> = {
    defaultValues: undefined,
  },
) {
  const baseHook = useBaseFormHook<CategoryInterface>({
    defaultValues,
  });

  return {
    ...baseHook,
  };
}
