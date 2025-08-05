"use client";

import { useCallback } from "react";
import { Button, ButtonGroup } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { IconEdit, IconX } from "@tabler/icons-react";

import useEditMode from "@/hooks/common/details/useEditMode";

type Props = {
  children?: React.ReactNode;
  isLoading?: boolean;
  onClose: () => void;
};

function EditModeDrawerHeader({
  isLoading = true,
  onClose: mainOnClose,
  children,
}: Props) {
  const { editMode, setEditMode } = useEditMode();

  const changeEditMode = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode, setEditMode]);

  const onClose = useCallback(() => {
    mainOnClose();
    setEditMode(false);
  }, [mainOnClose, setEditMode]);

  return (
    <div
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
    </div>
  );
}

export default EditModeDrawerHeader;
