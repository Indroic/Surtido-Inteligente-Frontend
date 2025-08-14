import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { ToastProps } from "@heroui/toast";

import useDefaultDetailsController from "./useDefaultDrawerStateController";
import useDefaultDrawerIDController from "./useDefaultDrawerIDController";

import { DrawerController, DrawerIDController } from "@/types/details";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { BaseFormHookProps } from "@/hooks/baseFormHook";
import { BaseInterface } from "@/types/bases";
import { addIDQuery } from "@/helpers/apiStringsPathsHelpers";

type UseDetailsProps<TEntity> = {
  apiPath: string;
  useFormHook: (props?: BaseFormHookProps<TEntity>) => any;
  toastMessages: {
    update: {
      title: string;
      description: string;
      color: ToastProps["color"];
    };
  };
  onSuccess?: (data?: TEntity) => void | Promise<void>;
  formProps?: BaseFormHookProps<TEntity>;
  stateController?: DrawerController;
  idController?: DrawerIDController;
};

export default function useDetails<TEntity extends BaseInterface>({
  apiPath,
  useFormHook,
  toastMessages,
  onSuccess,
  formProps,
  stateController = useDefaultDetailsController,
  idController = useDefaultDrawerIDController,
}: UseDetailsProps<TEntity>) {
  const { editMode, setEditMode } = stateController();
  const { id, setID } = idController();

  const {
    data,
    isLoading,
    mutate: mutateEntity,
  } = useSWR<TEntity>(id ? addIDQuery(apiPath, id) : null);

  const formHook = useFormHook(formProps);
  const { reset, setLoading, handleSubmit, setError } = formHook;

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const handleClose = useCallback(
    (closeDrawerFn: () => void) => {
      setID(null);
      setEditMode(false);
      closeDrawerFn();
    },
    [setID, setEditMode],
  );

  const submit = useCallback(() => {
    const success = async (data?: TEntity) => {
      setEditMode(false);
      await mutateEntity(data);
      if (onSuccess) {
        await onSuccess(data);
      }
    };

    setLoading(true);
    handleSubmit((form: TEntity) =>
      handleSubmitApi<TEntity>({
        form,
        url: addIDQuery(apiPath, id ? id : ""),
        toast: toastMessages.update,
        type: "update",
        reset,
        setError,
        successFunction: success,
      }),
    )().finally(() => setLoading(false));
  }, [
    handleSubmit,
    id,
    apiPath,
    toastMessages,
    setLoading,
    reset,
    setError,
    setEditMode,
    mutateEntity,
    onSuccess,
  ]);

  return {
    id,
    data,
    isLoading,
    editMode,
    setEditMode,
    handleClose,
    submit,
    formHook,
  };
}
