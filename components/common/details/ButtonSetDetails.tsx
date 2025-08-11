"use client";

import { Button } from "@heroui/button";
import { useCallback } from "react";

import useDrawerDetails from "@/hooks/common/details/useDetailsDrawer";

type Props = {
  value: string;
  callBack: (value: string) => Promise<URLSearchParams>;
};

function ButtonSetDetails({ value, callBack }: Props) {
  const { setOpenDetails } = useDrawerDetails();
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
