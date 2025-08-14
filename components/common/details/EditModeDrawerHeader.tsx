"use client";

import { useCallback, useRef } from "react";
import { Button, ButtonGroup } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { IconEdit, IconX } from "@tabler/icons-react";

import useDefaultDetailsController from "@/hooks/controllers/common/details/useDefaultDrawerStateController";
import { DrawerController } from "@/types/details";

type Props = {
  children?: React.ReactNode;
  isLoading?: boolean;
  onClose: () => void;
  stateDrawerController?: DrawerController;
};

function EditModeDrawerHeader({
  isLoading = true,
  onClose: mainOnClose,
  children,
  stateDrawerController = useDefaultDetailsController,
}: Props) {
  const refStateDrawerController = useRef(stateDrawerController);
  const { editMode, setEditMode } = refStateDrawerController.current();

  const changeEditMode = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode, setEditMode]);

  const onClose = useCallback(() => {
    mainOnClose();
    setEditMode(false);
  }, [mainOnClose, setEditMode]);

  return (
    <header
      className={`flex flex-row ${children ? "justify-between" : "justify-end"} items-center min-h-full w-full gap-5`}
    >
      {children ? (
        <Skeleton
          className="min-h-full w-full rounded-md"
          isLoaded={!isLoading}
        >
          {children}
        </Skeleton>
      ) : undefined}
      <ButtonGroup>
        <Button
          color="primary"
          size="sm"
          startContent={<IconEdit size={16} />}
          variant="light"
          onPress={changeEditMode}
        >
          Editar
        </Button>

        <Button isIconOnly size="sm" variant="light" onPress={() => onClose()}>
          <IconX size={16} />
        </Button>
      </ButtonGroup>
    </header>
  );
}

export default EditModeDrawerHeader;
