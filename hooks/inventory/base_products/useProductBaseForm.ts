import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isEqual } from "lodash";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import {
  CategoryInterface,
  ProductInterface,
  ProductTypeInterface,
} from "@/types/products";

type Props = {
  deactivated?: boolean;
  defaultValues?: {
    category: string;
    product_type: string;
    name: string;
    description: string;
  };
};

export default function useProductBaseForm(
  {
    deactivated = false,
    defaultValues = {
      category: "",
      product_type: "",
      name: "",
      description: "",
    },
  }: Props = { defaultValues: undefined },
) {
  const [openCategories, setOpenCategories] = useState(false);
  const [openProductTypes, setOpenProductTypes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onChargedDefaultsValues, setOnChargedDefaultsValues] = useState(false); // Este State Evita que se reinicie el formulario

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

  const { handleSubmit, control, setError, reset, getValues } =
    useForm<ProductInterface>({
      defaultValues,
    });

  useEffect(() => {
    if (
      defaultValues &&
      !isEqual(getValues(), defaultValues) &&
      !onChargedDefaultsValues
    ) {
      setOnChargedDefaultsValues(true);
      reset(defaultValues);
    }
  }, [defaultValues, reset, getValues]);

  return {
    handleSubmit,
    control,
    setError,
    reset,
    loading,
    openCategories,
    setOpenCategories,
    openProductTypes,
    setOpenProductTypes,
    setLoading,
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
    deactivated,
  };
}
