import { useCallback } from "react";

import useDrawerDetails from "@/hooks/common/details/useDetailsDrawer";
import useEditMode from "@/hooks/common/details/useEditMode";
import { DrawerController } from "@/types/details";

const useDefaultDetailsController: DrawerController = () => {
  const { openDetails, setOpenDetails } = useDrawerDetails();
  const { editMode, setEditMode } = useEditMode();

  const onClose = useCallback(() => {
    setOpenDetails(false);
  }, [setOpenDetails]);

  return {
    isOpen: openDetails,
    setIsOpen: setOpenDetails,
    onClose,
    editMode,
    setEditMode,
  };
};

export default useDefaultDetailsController;
