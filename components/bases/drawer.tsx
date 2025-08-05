import React, { useState, useEffect, useCallback } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerProps,
} from "@heroui/drawer";
import { Button } from "@heroui/button";

export type CustomDrawerProps = {
  children: React.ReactNode;
  hideCloseButton?: boolean;
  triggerLabel?: string;
  hideTrigger?: boolean;
  triggerProps?: React.ComponentProps<typeof Button>;
  title?: string;
  headerChildren?: (onCloseDrawer: () => void) => React.ReactNode;
  headerProps?: React.ComponentProps<typeof DrawerHeader>;
  drawerProps?: Omit<DrawerProps, "children">;
  bodyDrawerProps?: React.ComponentProps<typeof DrawerBody>;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  children,
  triggerLabel,
  hideTrigger = false,
  triggerProps,
  title,
  headerChildren,
  headerProps,
  drawerProps,
  bodyDrawerProps,
  open: controlledOpen,
  onOpen: onOpenProp,
  onClose: onCloseProp,
  hideCloseButton = false,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(controlledOpen ?? false);

  const isControlled = controlledOpen !== undefined;

  const isOpen = isControlled ? controlledOpen : internalIsOpen;

  useEffect(() => {
    if (isControlled && controlledOpen !== internalIsOpen) {
      setInternalIsOpen(controlledOpen);
    }
  }, [controlledOpen, internalIsOpen, isControlled]);

  const handleOpen = useCallback(() => {
    if (!isControlled) {
      setInternalIsOpen(true);
    }
    onOpenProp?.();
  }, [isControlled, onOpenProp]);

  const handleOpenChange = useCallback(
    (newOpenState: boolean) => {
      if (isControlled) {
        if (newOpenState) {
          onOpenProp?.();
        } else {
          onCloseProp?.();
        }
      } else {
        setInternalIsOpen(newOpenState);

        if (newOpenState) {
          onOpenProp?.();
        } else {
          onCloseProp?.();
        }
      }
    },
    [isControlled, onOpenProp, onCloseProp],
  );

  return (
    <>
      {!hideTrigger ? (
        <Button
          className="rounded-md shadow-md hover:shadow-lg transition-all duration-200"
          color="primary"
          onPress={handleOpen}
          {...triggerProps}
        >
          {triggerLabel}
        </Button>
      ) : null}

      <Drawer
        hideCloseButton={hideCloseButton}
        isOpen={isOpen}
        placement="left"
        onOpenChange={handleOpenChange}
        {...drawerProps}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader {...headerProps}>
                {headerChildren ? (
                  headerChildren(onClose)
                ) : (
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {title}
                  </h2>
                )}
              </DrawerHeader>
              <DrawerBody {...bodyDrawerProps}>{children}</DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
