"use client";

import React, { ReactNode } from "react";
import { Button, ButtonGroup } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

interface CustomModalProps {
  triggerLabel: string;
  title: string;
  children: ReactNode;
  modalprops?: Omit<React.ComponentProps<typeof Modal>, "children">;
  triggerIcon?: React.ReactNode;
  onConfirm?: (closeModal: () => void) => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "primary" | "danger" | "default";
  cancelColor?: "primary" | "danger" | "default";
  triggerProps?: React.ComponentProps<typeof Button>;
  onOpen?: (isOpen: boolean, setOpen: (open: boolean) => void) => void;
  onClose?: (isOpen: boolean, setOpen: (open: boolean) => void) => void;
}

export default class CustomModal extends React.Component<CustomModalProps> {
  state = { isOpen: false };

  setOpen = (open: boolean) => {
    this.setState({ isOpen: open });
  };

  handleOpen = () => {
    if (this.props.onOpen) this.props.onOpen(true, this.setOpen);
    this.setOpen(true);
  };

  handleClose = () => {
    if (this.props.onClose) this.props.onClose(false, this.setOpen);
    this.setOpen(false);
  };

  handleConfirm = () => {
    if (this.props.onConfirm) {
      // Si hay onConfirm, solo se cierra si el usuario llama a closeModal
      this.props.onConfirm(this.handleClose);
    } else {
      // Si no hay onConfirm, se cierra por defecto
      this.handleClose();
    }
  };

  render() {
    const {
      triggerLabel,
      triggerIcon,
      title,
      children,
      confirmLabel = "Confirmar",
      cancelLabel = "Cancelar",
      confirmColor = "primary",
      cancelColor = "danger",
      triggerProps = {},
    } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <Button
          color="primary"
          size="sm"
          startContent={triggerIcon}
          {...triggerProps}
          onPress={this.handleOpen}
        >
          {triggerLabel}
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={(open) => {
            if (open) {
              if (this.props.onOpen) this.props.onOpen(true, this.setOpen);
            } else {
              if (this.props.onClose) this.props.onClose(false, this.setOpen);
            }
            this.setOpen(open);
          }}
          {...this.props.modalprops}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                  <ButtonGroup>
                    <Button
                      color={cancelColor}
                      variant="light"
                      onPress={onClose || this.handleClose}
                    >
                      {cancelLabel}
                    </Button>
                    <Button color={confirmColor} onPress={this.handleConfirm}>
                      {confirmLabel}
                    </Button>
                  </ButtonGroup>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
}
