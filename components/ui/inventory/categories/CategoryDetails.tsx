"use client";

import { CATEGORY_API_URL } from "@/components/ui/UrlPaths";
import DrawerDetails from "@/components/common/details/DetailsDrawer";
import useDetails from "@/hooks/common/details/useDetails";
import { CategoryInterface } from "@/types/products";
import useCategoryForm from "@/hooks/inventory/useCategorieForm";
import CategoryForm from "@/components/forms/inventory/CategoryForm";

export default function CategoryDetails() {
  const useDetailsContext = useDetails<CategoryInterface>({
    apiPath: CATEGORY_API_URL,
    useFormHook: useCategoryForm,
    toastMessages: {
      update: {
        title: "Categoria Actualizada",
        description: "La Categoria se ha actualizado correctamente.",
        color: "success",
      },
    },
  });

  const deactivated =
    !useDetailsContext.isLoading && !useDetailsContext.editMode;

  return (
    <DrawerDetails
      hiddeCloseButton
      editForm={
        <CategoryForm
          {...useDetailsContext.formHook}
          deactivated={deactivated}
        />
      }
      isLoaded={!useDetailsContext.isLoading}
      submitForm={useDetailsContext.submit}
      title={useDetailsContext.data?.name}
      onCloseDrawer={useDetailsContext.handleClose}
    />
  );
}
