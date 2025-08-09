import { Alert, Input } from "@heroui/react";
import { IconTrash } from "@tabler/icons-react";
import { Form } from "@heroui/react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";

import CustomModal from "@/components/bases/modal";
import handleDeleteApi, {
  HandleDeleteApiProps,
} from "@/helpers/handleDeleteApi";

type Props = {
  url: string;
  title: string;
  description: string;
  segurityText: string;
  secondarySegurityText: string;
  toastProps?: HandleDeleteApiProps["toast"];
};

function DeleteModal({
  title,
  description,
  segurityText,
  secondarySegurityText,
  url,
  toastProps = {
    title: "Item Eliminado",
    description: "El Item se ha eliminado correctamente.",
    color: "success",
  },
}: Props) {
  const validationSchema = yup
    .object({
      segurityText: yup
        .string()
        .required()
        .equals([segurityText], "El Texto No Coincide"),
      secondarySegurityText: yup
        .string()
        .required()
        .equals([secondarySegurityText], "El Texto No Coincide"),
    })
    .required();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      segurityText: "",
      secondarySegurityText: "",
    },
  });

  const onSubmit = useCallback(
    (closeModal: () => void) => {
      handleSubmit(() =>
        handleDeleteApi({
          url: url,
          toast: toastProps,
          successFunction: closeModal,
        }),
      )();
    },
    [handleSubmit, url, toastProps],
  );

  const onCancel = useCallback(
    (closeModal: () => void) => {
      reset();
      closeModal();
    },
    [reset],
  );

  return (
    <CustomModal
      cancelColor="primary"
      cancelProps={{ variant: "solid" }}
      confirmColor="danger"
      confirmLabel="Eliminar"
      confirmProps={{ variant: "light" }}
      headerChildren={
        <>
          <p className="text-start text-base font-normal">{description}</p>
          <Alert
            hideIcon
            color="danger"
            description={
              <p>
                <strong>Advertencia: </strong>
                Esta acción es <strong>IRREVERSIBLE</strong>
              </p>
            }
          />
        </>
      }
      modalprops={{
        size: "xl",
        scrollBehavior: "inside",
        classNames: {
          header: "border-b-1 border-divider",
        },
      }}
      title={title}
      triggerColor="danger"
      triggerLabel="Eliminar"
      triggerProps={{
        startContent: <IconTrash size={16} />,
        variant: "light",
      }}
      onCancel={onCancel}
      onConfirm={onSubmit}
    >
      <Form className="flex flex-col gap-4">
        <Controller
          control={control}
          name="segurityText"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Input
              ref={ref}
              errorMessage={error?.message}
              isInvalid={invalid}
              label={
                <p>
                  Escriba <strong>{segurityText}</strong> para continuar
                </p>
              }
              labelPlacement="outside-top"
              name={name}
              validationBehavior="aria"
              value={value}
              variant="bordered"
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="secondarySegurityText"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Input
              ref={ref}
              errorMessage={error?.message}
              isInvalid={invalid}
              label={
                <p>
                  Escriba <strong>{secondarySegurityText}</strong> para
                  confirmar la eliminación
                </p>
              }
              labelPlacement="outside-top"
              name={name}
              validationBehavior="aria"
              value={value}
              variant="bordered"
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
        />
      </Form>
    </CustomModal>
  );
}

export default DeleteModal;
