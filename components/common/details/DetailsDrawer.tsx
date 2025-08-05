"use client";

import { useCallback } from "react";
import { Skeleton } from "@heroui/skeleton";

import CustomDrawer, { CustomDrawerProps } from "@/components/bases/drawer";
import useDrawerDetails from "@/hooks/common/details/useDetailsDrawer";

export type DrawerDetailsProps = {
  children: React.ReactNode;
  hiddeCloseButton?: boolean;
  onCloseDrawer?: (handleCloseDrawer: () => void) => void;
  headerChildren?: CustomDrawerProps["headerChildren"];
  headerProps?: CustomDrawerProps["headerProps"];
  isLoaded?: boolean;
};

function DrawerDetails({
  children,
  onCloseDrawer,
  headerChildren,
  hiddeCloseButton,
  isLoaded = true,
}: DrawerDetailsProps) {
  const { openDetails, setOpenDetails } = useDrawerDetails();

  const handleCloseDrawer = useCallback(() => {
    setOpenDetails(false);
  }, [setOpenDetails]);

  return (
    <CustomDrawer
      hideTrigger
      headerChildren={headerChildren}
      hideCloseButton={hiddeCloseButton}
      open={openDetails}
      onClose={
        onCloseDrawer
          ? () => onCloseDrawer(handleCloseDrawer)
          : handleCloseDrawer
      }
    >
      <Skeleton className="rounded-md h-full w-full" isLoaded={isLoaded}>
        {children}
      </Skeleton>
    </CustomDrawer>
  );
}

export default DrawerDetails;
