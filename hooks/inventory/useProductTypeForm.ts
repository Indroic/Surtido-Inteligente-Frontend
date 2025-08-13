import { DefaultValues } from "react-hook-form";
import { useState } from "react";

import useInfiniteScroll from "../useInfiniteScroll";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import { ProductTypeInterface } from "@/types/products";
import { ImpuestoInterface } from "@/types/legal";

const defaultProductValues: DefaultValues<ProductTypeInterface> = {
  name: "",
  impuesto: "",
};

export default function useProductTypeForm(
  {
    defaultValues = defaultProductValues,
  }: BaseFormHookProps<ProductTypeInterface> = {
    defaultValues: undefined,
  },
) {
  const [openImpuestos, setOpenImpuestos] = useState(false);

  const baseHook = useBaseFormHook<ProductTypeInterface>({
    defaultValues,
  });
  const {
    items: impuestos,
    loading: impuestosLoading,
    scrollerRef: scrollerRefImpuestos,
  } = useInfiniteScroll<ImpuestoInterface>({
    Enabled: openImpuestos,
    url: "/api/legal/impuestos",
  });

  return {
    openImpuestos,
    setOpenImpuestos,
    impuestosData: {
      impuestos,
      impuestosLoading,
      scrollerRefImpuestos,
    },
    ...baseHook,
  };
}
