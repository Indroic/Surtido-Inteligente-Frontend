"use client";

import { IconPlus } from "@tabler/icons-react";
import { Form } from "@heroui/form";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Controller, useForm } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";

import CustomModal from "@/components/bases/modal";
import { PaginationInterface } from "@/types/responses";
import { CategoryInterface, ProductTypeInterface } from "@/types/products";
import { enableCompileCache } from "module";
import { getCsrfToken } from "next-auth/react";

// --- Custom hooks para obtención de datos con scroll infinito ---
function useInfiniteCategories({ Enabled }: { Enabled: boolean }) {
  const selectItemsLimit = 10;
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMore = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/inventory/products/categories/list?offset=${offset}&limit=${selectItemsLimit}`
      );
      const data: PaginationInterface<CategoryInterface> = await res.json();

      setCategories((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = (data.results || []).filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prev, ...newItems];
      });
      setHasMore(Boolean(data.next));
      setOffset((prev) => prev + selectItemsLimit);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: Enabled,
    shouldUseLoader: false,
    onLoadMore: fetchMore,
  });

  useEffect(() => {
    fetchMore();
  }, []);

  return { categories, loading, scrollerRef };
}

function useInfiniteProductTypes({ Enabled }: { Enabled: boolean }) {
  const selectItemsLimit = 10;
  const [productTypes, setProductTypes] = useState<ProductTypeInterface[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMore = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/inventory/products/productTypes/list?offset=${offset}&limit=${selectItemsLimit}`
      );
      const data: PaginationInterface<ProductTypeInterface> = await res.json();

      setProductTypes((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = (data.results || []).filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prev, ...newItems];
      });
      setHasMore(Boolean(data.next));
      setOffset((prev) => prev + selectItemsLimit);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  const [scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: Enabled,
    shouldUseLoader: false,
    onLoadMore: fetchMore,
  });

  useEffect(() => {
    fetchMore();
  }, []);

  return { productTypes, loading, scrollerRef };
}

// Componente principal
export default function ModalCreate() {
  const [csrfToken, setCsrfToken] = useState<string | undefined>();
  const [openCategories, setOpenCategories] = useState(false);
  const [openProductTypes, setOpenProductTypes] = useState(false);
  // Usar hooks personalizados
  const {
    categories,
    loading: categoriesLoading,
    scrollerRef: scrollerCategoriesRef,
  } = useInfiniteCategories({ Enabled: openCategories });
  const {
    productTypes,
    loading: productTypesLoading,
    scrollerRef: scrollerProductTypesRef,
  } = useInfiniteProductTypes({ Enabled: openProductTypes });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      category: "",
      product_type: "",
      description: "",
      csrfmiddlewaretoken: csrfToken,
    },
  });

  useEffect(() => {
    getCsrfToken().then((token) => {
      setCsrfToken(token as string);
    });
  }, []);

  return (
    <CustomModal
      modalprops={{ size: "xl" }}
      title="Nuevo Producto"
      triggerLabel="Nuevo Producto"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => {
        handleSubmit((data) => {
          fetch("/api/inventory/products/create", {
            method: "POST",
            body: JSON.stringify(data),
          })
            .then((res) => {
              if (res.ok) {
                console.log(res);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })();
      }}
    >
      <Form className="flex flex-col gap-4">
        <input
          name="csrfmiddlewaretoken"
          type="hidden"
          defaultValue={csrfToken}
        />
        <Controller
          control={control}
          name="name"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Input
              ref={ref}
              isRequired
              errorMessage={error?.message}
              isInvalid={invalid}
              label="Nombre"
              name={name}
              validationBehavior="aria"
              value={value}
              variant="bordered"
              // Let React Hook Form handle validation instead of the browser.
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          rules={{ required: "El Nombre es Requerido" }}
        />
        <Controller
          control={control}
          name="category"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Select
              ref={ref}
              isRequired
              errorMessage={error?.message}
              isInvalid={invalid}
              isLoading={categoriesLoading}
              items={categories}
              label="Categoría"
              labelPlacement="outside"
              name={name}
              scrollRef={scrollerCategoriesRef}
              validationBehavior="aria"
              value={value}
              onChange={onChange}
              variant="bordered"
              // Let React Hook Form handle validation instead of the browser.
              onBlur={onBlur}
              onOpenChange={setOpenCategories}
            >
              {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
            </Select>
          )}
          rules={{ required: "La Categoría es Requerida" }}
        />
        <Controller
          control={control}
          name="product_type"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Select
              ref={ref}
              isRequired
              errorMessage={error?.message}
              isInvalid={invalid}
              isLoading={productTypesLoading}
              items={productTypes}
              label="Tipo de Producto"
              labelPlacement="outside"
              name={name}
              scrollRef={scrollerProductTypesRef}
              validationBehavior="aria"
              value={value}
              onChange={onChange}
              variant="bordered"
              // Let React Hook Form handle validation instead of the browser.
              onBlur={onBlur}
              onOpenChange={setOpenProductTypes}
            >
              {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
            </Select>
          )}
          rules={{ required: "El Tipo de Producto es Requerido" }}
        />
        <Controller
          control={control}
          name="description"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Textarea
              ref={ref}
              isRequired
              errorMessage={error?.message}
              isInvalid={invalid}
              label="Descripción"
              name={name}
              validationBehavior="aria"
              value={value}
              variant="bordered"
              // Let React Hook Form handle validation instead of the browser.
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          rules={{ required: "La Descripción es Requerida" }}
        />
      </Form>
    </CustomModal>
  );
}
