"use client";

import { Button } from "@heroui/button";
import { useCallback } from "react";

import { DrawerController } from "@/types/details";
import useDefaultDetailsController from "@/hooks/common/details/useDefaultDrawerStateController";

type Props = {
  value: string;
  callBack: (value: string) => Promise<URLSearchParams>;
  detailsDrawerStateController?: DrawerController;
};

function ButtonSetDetails({
  value,
  callBack,
  detailsDrawerStateController = useDefaultDetailsController,
}: Props) {
  const { setIsOpen: setOpenDetails } = detailsDrawerStateController();

  const handleOpenDrawer = useCallback(() => {
    setOpenDetails(true);
    callBack(value);
  }, [setOpenDetails, callBack, value]);

  return (
    <Button color="primary" onPress={handleOpenDrawer}>
      Detalles
    </Button>
  );
}

export default ButtonSetDetails;
