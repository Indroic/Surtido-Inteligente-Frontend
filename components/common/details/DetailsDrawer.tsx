"use client";

import { useCallback } from "react";

import CustomDrawer from "@/components/bases/drawer";
import useDrawerDetails from "@/hooks/common/details/useDetailsDrawer";

function DrawerDetails({
  children,
  onCloseDrawer,
}: {
  children: React.ReactNode;
  onCloseDrawer?: (handleCloseDrawer: () => void) => void;
}) {
  const { openDetails, setOpenDetails } = useDrawerDetails();

  const handleCloseDrawer = useCallback(() => {
    setOpenDetails(false);
  }, [setOpenDetails]);

  return (
    <CustomDrawer
      hideTrigger
      open={openDetails}
      onClose={
        onCloseDrawer
          ? () => onCloseDrawer(handleCloseDrawer)
          : handleCloseDrawer
      }
    >
      {children}
    </CustomDrawer>
  );
}

export default DrawerDetails;
