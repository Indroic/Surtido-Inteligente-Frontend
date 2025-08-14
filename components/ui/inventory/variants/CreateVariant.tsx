import { IconPlus } from "@tabler/icons-react";
import { KeyedMutator } from "swr";
import { useCallback } from "react";

import { VARIANTS_API_URL } from "@/components/ui/UrlPaths";
import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { ProductInterface, ProductVariantInterface } from "@/types/products";
import useProductVariantForm from "@/hooks/inventory/useProductVariantForm";
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
    },
  });

  const onSubmit = useCallback(
    (closeModal: () => void) => {
      formHook.setLoading(true);
      formHook
        .handleSubmit((data) =>
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
              closeModal();
              mutateProductBase((product) => {
                if (!product) {
                  return product;
                }

                return {
                  ...product,
                  variants_obj: [
                    ...(product.variants_obj || []),
                    newVariant as any,
                  ],
                };
              });
            },
          }),
        )()
        .finally(() => formHook.setLoading(false));
    },
    [formHook, mutateProductBase],
  );

  return (
    <CustomModal
      modalprops={{ size: "xl", scrollBehavior: "inside" }}
      title="Nueva Variante"
      triggerLabel="Nueva Variante"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
    >
      <ProductVariantForm {...formHook} />
    </CustomModal>
  );
}
