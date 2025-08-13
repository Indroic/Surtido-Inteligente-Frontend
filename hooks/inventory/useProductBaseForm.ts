import { useState } from "react";
import { DefaultValues } from "react-hook-form";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import {
  CategoryInterface,
  ProductInterface,
  ProductTypeInterface,
} from "@/types/products";

const defaultProductValues: DefaultValues<ProductInterface> = {
  category: "",
  name: "",
  description: "",
  product_type: "",
};

export default function useProductBaseForm(
  {
    defaultValues = defaultProductValues,
  }: BaseFormHookProps<ProductInterface> = {
    defaultValues: undefined,
  },
) {
  const baseHook = useBaseFormHook<ProductInterface>({
    defaultValues,
  });
  const [openCategories, setOpenCategories] = useState(false);
  const [openProductTypes, setOpenProductTypes] = useState(false);

  const {
    items: categories,
    loading: categoriesLoading,
    scrollerRef: scrollerCategoriesRef,
  } = useInfiniteScroll<CategoryInterface>({
    Enabled: openCategories,
    url: "/api/inventory/products/categories",
  });
  const {
    items: productTypes,
    loading: productTypesLoading,
    scrollerRef: scrollerProductTypesRef,
  } = useInfiniteScroll<ProductTypeInterface>({
    Enabled: openProductTypes,
    url: "/api/inventory/products/productTypes",
  });

  return {
    openCategories,
    setOpenCategories,
    openProductTypes,
    setOpenProductTypes,
    categoriesData: {
      categories,
      categoriesLoading,
      scrollerCategoriesRef,
    },
    productTypesData: {
      productTypes,
      productTypesLoading,
      scrollerProductTypesRef,
    },
    ...baseHook,
  };
}
