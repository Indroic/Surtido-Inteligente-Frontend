import { IconPlus } from "@tabler/icons-react";

import { PRODUCT_TYPE_API_URL } from "../../UrlPaths";

import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { ProductTypeInterface } from "@/types/products";
import useProductTypeForm from "@/hooks/inventory/useProductTypeForm";
import ProductTypeForm from "@/components/forms/inventory/ProductTypeForm";

export default function CreateProductType() {
  const formHook = useProductTypeForm();

  const onSubmit = (closeModal: () => void) => {
    formHook.setLoading(true);
    formHook
      .handleSubmit((data) =>
        handleSubmitApi<ProductTypeInterface>({
          form: data,
          url: PRODUCT_TYPE_API_URL,
          toast: {
            title: "Tipo de Producto Creado",
            description: "El Tipo de Producto se ha creado correctamente.",
            color: "success",
          },
          type: "create",
          reset: formHook.reset,
          setError: formHook.setError,
          successFunction: closeModal,
        }),
      )()
      .finally(() => formHook.setLoading(false));
  };

  return (
    <CustomModal
      modalprops={{ size: "xl", scrollBehavior: "inside" }}
      title="Nuevo Tipo de Producto"
      triggerLabel="Nuevo Tipo de Producto"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
    >
      <ProductTypeForm {...formHook} />
    </CustomModal>
  );
}
