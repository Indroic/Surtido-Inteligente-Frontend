import { useCallback } from "react";

import { DrawerController } from "@/types/details";
import useVariantDetailsParam from "@/hooks/inventory/variants/useVariantDetailsDrawer";
import useVariantEditMode from "@/hooks/inventory/variants/useVariantEditMode";

const useVariantDetailsStateController: DrawerController = () => {
  const { openVariantDetails: isOpen, setOpenVariantDetails: setIsOpen } =
    useVariantDetailsParam();
  const { variantEditMode: editMode, setVariantEditMode: setEditMode } =
    useVariantEditMode();

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    onClose,
    editMode,
    setEditMode,
  };
};

export default useVariantDetailsStateController;
