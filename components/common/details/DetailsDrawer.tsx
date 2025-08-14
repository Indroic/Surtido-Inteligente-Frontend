"use client";

import React from "react";
import { Skeleton } from "@heroui/skeleton";
import { Button, ButtonGroup, Tab, Tabs } from "@heroui/react";
import { IconBook } from "@tabler/icons-react";

import EditModeDrawerHeader from "./EditModeDrawerHeader";

import CustomDrawer, { CustomDrawerProps } from "@/components/bases/drawer";
import ResumeCards, {
  resumeCardProps,
} from "@/components/common/resume/ResumeCards";
import { DrawerController } from "@/types/details";
import useDefaultDetailsController from "@/hooks/common/details/useDefaultDrawerStateController";

export type DrawerDetailsProps = {
  title?: string;
  children?: React.ReactElement<typeof Tab> | React.ReactElement<typeof Tab>[];
  resumeCardsData?: resumeCardProps[];
  editForm: React.ReactNode;
  submitForm: () => void;
  resetForm?: () => void;
  hiddeCloseButton?: boolean;
  onCloseDrawer?: (handleCloseDrawer: () => void) => void;
  headerProps?: CustomDrawerProps["headerProps"];
  isLoaded?: boolean;
  stateController?: DrawerController;
};

function DrawerDetails({
  title,
  children,
  resumeCardsData,
  editForm,
  submitForm,
  resetForm,
  onCloseDrawer,
  hiddeCloseButton,
  isLoaded = true,
  stateController = useDefaultDetailsController,
}: DrawerDetailsProps) {
  const state = stateController();

  return (
    <CustomDrawer
      hideTrigger
      drawerProps={{
        size: "xl",
      }}
      headerChildren={(onClose) => (
        <EditModeDrawerHeader isLoading={!isLoaded} onClose={onClose}>
          <h1 className="flex items-center justify-start text-2xl font-semibold">
            {title}
          </h1>
        </EditModeDrawerHeader>
      )}
      hideCloseButton={hiddeCloseButton}
      open={state.isOpen}
      onClose={
        onCloseDrawer ? () => onCloseDrawer(state.onClose) : state.onClose
      }
    >
      <Skeleton className="rounded-md h-full w-full" isLoaded={isLoaded}>
        <Tabs fullWidth>
          <Tab key={"resumen"} className="flex flex-col gap-4" title="Resumen">
            <ResumeCards resumeCards={resumeCardsData} />
          </Tab>
          <Tab key={"general"} className="flex flex-col gap-4" title="General">
            {editForm}
            <div className="flex flex-row w-full items-center justify-end">
              <ButtonGroup>
                <Button
                  color="danger"
                  isDisabled={!state.editMode}
                  variant="light"
                  onPress={() => resetForm?.()}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  isDisabled={!state.editMode}
                  startContent={<IconBook size={16} />}
                  onPress={() => submitForm()}
                >
                  Guardar
                </Button>
              </ButtonGroup>
            </div>
          </Tab>
          {children}
        </Tabs>
      </Skeleton>
    </CustomDrawer>
  );
}

export default DrawerDetails;
