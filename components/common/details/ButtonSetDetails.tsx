"use client";

import { Button } from "@heroui/button";
import { useCallback, useRef } from "react";

import { DrawerController } from "@/types/details";
import useDefaultDetailsController from "@/hooks/controllers/common/details/useDefaultDrawerStateController";

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
  const refDefaultController = useRef(detailsDrawerStateController);

  const { setIsOpen: setOpenDetails } = refDefaultController.current();

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
