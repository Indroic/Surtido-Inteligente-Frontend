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
import { VariantProps } from "@heroui/theme";

interface CustomModalProps {
  triggerLabel: string;
  triggerProps?: React.ComponentProps<typeof Button>;
  triggerIcon?: React.ReactNode;
  title: string;
  children: ReactNode;
  headerChildren?: ReactNode;
  modalprops?: Omit<React.ComponentProps<typeof Modal>, "children">;
  onConfirm?: (closeModal: () => void) => void;
  onSecondConfirm?: (closeModal: () => void) => void; // este es para el boton de "guardar y seguir registrando"
  onCancel?: (closeModal: () => void) => void;
  confirmLabel?: string;
  confirmProps?: React.ComponentProps<typeof Button>;
  secondConfirmLabel?: string;
  secondConfirmProps?: React.ComponentProps<typeof Button>;
  cancelLabel?: string;
  cancelProps?: React.ComponentProps<typeof Button>;
  confirmColor?: VariantProps<typeof Button>["color"];
  secondConfirmColor?: VariantProps<typeof Button>["color"];
  cancelColor?: VariantProps<typeof Button>["color"];
  triggerColor?: VariantProps<typeof Button>["color"];
  onOpen?: (isOpen: boolean, setOpen: (open: boolean) => void) => void;
  onClose?: (isOpen: boolean, setOpen: (open: boolean) => void) => void;
  footer?: ReactNode;
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

  handleCancel = () => {
    if (this.props.onCancel) {
      // Si hay onConfirm, solo se cierra si el usuario llama a closeModal
      this.props.onCancel(this.handleClose);
    } else {
      // Si no hay onCancel, se cierra por defecto
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
      secondConfirmLabel = "Confirmar y Nuevo",
      confirmColor = "primary",
      secondConfirmColor = "secondary",
      cancelColor = "danger",
      triggerColor = "primary",
      triggerProps = {},
      confirmProps = {},
      secondConfirmProps = {},
      cancelProps = {},
    } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <Button
          color={triggerColor}
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
                <ModalHeader className="flex flex-col gap-5">
                  <h1>{title}</h1>
                  {this.props.headerChildren}
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                  {this.props.footer ? (
                    this.props.footer
                  ) : (
                    <ButtonGroup>
                      <Button
                        color={cancelColor}
                        variant="light"
                        onPress={onClose || this.handleClose}
                        {...cancelProps}
                      >
                        {cancelLabel}
                      </Button>
                      {this.props.onSecondConfirm && (
                        <Button
                          color={secondConfirmColor}
                          variant="flat"
                          onPress={this.handleConfirm}
                          {...secondConfirmProps}
                        >
                          {secondConfirmLabel}
                        </Button>
                      )}
                      <Button
                        color={confirmColor}
                        onPress={this.handleConfirm}
                        {...confirmProps}
                      >
                        {confirmLabel}
                      </Button>
                    </ButtonGroup>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
}
