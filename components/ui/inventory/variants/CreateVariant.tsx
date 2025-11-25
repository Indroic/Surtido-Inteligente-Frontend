import { IconPlus } from "@tabler/icons-react";
import { KeyedMutator } from "swr";
import { useCallback } from "react";

import { VARIANTS_API_URL } from "@/UrlPaths";
import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { ProductInterface, ProductVariantInterface } from "@/types/products";
import useProductVariantForm from "@/hooks/inventory/variants/useProductVariantForm";
import ProductVariantForm from "@/components/forms/inventory/ProductVariantForm";

export type Props = {
  productBaseID?: string;
  mutateProductBase: KeyedMutator<ProductInterface>;
};

export default function CreateVariant({
  productBaseID,
  mutateProductBase,
}: Props) {
  const formHook = useProductVariantForm({
    defaultValues: {
      product: productBaseID,
      weight: 1,
    },
  });
  const submitCallback = useCallback(
    async (closeModal: () => void, secondarySubmit: boolean = false) => {
      formHook.setLoading(true);
      await formHook.handleSubmit((data) =>
        handleSubmitApi<ProductVariantInterface>({
          form: data,
          url: VARIANTS_API_URL,
          toast: {
            title: "Variante Creada",
            description: "Variante Creada Correctamente",
            color: "success",
          },
          type: "create",
          reset: formHook.reset,
          setError: formHook.setError,
          successFunction: (newVariant) => {
            if (!secondarySubmit) closeModal();
            mutateProductBase((product) => {
              if (!product) {
                return product;
              }

              return {
                ...product,
                variants_obj: [...(product.variants || []), newVariant as any],
              };
            });
          },
        }),
      )();
    },
    [formHook, mutateProductBase],
  );

  const onSubmit = (closeModal: () => void) =>
    submitCallback(closeModal).finally(() => formHook.setLoading(false));

  const onSubmitAndNew = (closeModal: () => void) =>
    submitCallback(closeModal, true).finally(() => formHook.setLoading(false));

  return (
    <CustomModal
      modalprops={{ size: "xl", scrollBehavior: "inside" }}
      title="Nueva Variante"
      triggerLabel="Nueva Variante"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
      onSecondConfirm={(closeModal) => onSubmitAndNew(closeModal)}
    >
      <ProductVariantForm {...formHook} />
    </CustomModal>
  );
}
