import { IconPlus } from "@tabler/icons-react";
import { useCallback } from "react";

import ProductBaseForm from "../../../forms/inventory/ProductBaseForm";

import { PRODUCT_BASE_API_URL } from "@/UrlPaths";
import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import useProductBaseForm from "@/hooks/inventory/useProductBaseForm";
import { ProductInterface } from "@/types/products";

export default function ModalCreate() {
  const formHook = useProductBaseForm();

  const onSubmit = useCallback(
    (closeModal: () => void) => {
      formHook.setLoading(true);
      formHook
        .handleSubmit((data) =>
          handleSubmitApi<ProductInterface>({
            form: data,
            url: PRODUCT_BASE_API_URL,
            toast: {
              title: "Producto Creado",
              description: "El producto se ha creado correctamente.",
              color: "success",
            },
            type: "create",
            reset: formHook.reset,
            setError: formHook.setError,
            successFunction: closeModal,
          }),
        )()
        .finally(() => formHook.setLoading(false));
    },
    [formHook],
  );

  return (
    <CustomModal
      modalprops={{ size: "xl", scrollBehavior: "inside" }}
      title="Nuevo Producto"
      triggerLabel="Nuevo Producto"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
    >
      <ProductBaseForm {...formHook} />
    </CustomModal>
  );
}
