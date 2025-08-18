import { IconPlus } from "@tabler/icons-react";
import { useCallback } from "react";

import { CATEGORY_API_URL } from "@/UrlPaths";
import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { CategoryInterface } from "@/types/products";
import useCategoryForm from "@/hooks/inventory/useCategorieForm";
import CategoryForm from "@/components/forms/inventory/CategoryForm";

export default function CreateCategory() {
  const formHook = useCategoryForm();

  const onSubmit = useCallback(
    (closeModal: () => void) => {
      formHook.setLoading(true);
      formHook
        .handleSubmit((data) =>
          handleSubmitApi<CategoryInterface>({
            form: data,
            url: CATEGORY_API_URL,
            toast: {
              title: "Categoria Creado",
              description: "La Categoria se ha creado correctamente.",
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
      title="Nuevo Categoria"
      triggerLabel="Nuevo Categoria"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
    >
      <CategoryForm {...formHook} />
    </CustomModal>
  );
}
