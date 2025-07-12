import { addToast, ToastProps } from "@heroui/toast";
import { ToastOptions } from "@react-stately/toast";
import { Path, UseFormReturn } from "react-hook-form";

import { BaseErrorInterface, BaseInterface } from "@/types/bases";

const handleSubmitApi = async <T extends BaseInterface>({
  form,
  url,
  toast,
  type,
  reset,
  setError,
  successFunction,
}: {
  form: T;
  url: string;
  toast: ToastProps & ToastOptions;
  type: "create" | "update";
  reset: () => void;
  setError: UseFormReturn<T>["setError"];
  successFunction?: () => void;
}) => {
  const res = await fetch(url, {
    method: type === "create" ? "POST" : "PUT",
    body: JSON.stringify(form),
  });

  if (res.ok) {
    addToast(toast);
    successFunction?.();
    reset();

    return;
  }

  if (!res.ok && res.status === 400) {
    const data: BaseErrorInterface<T> = await res.json();

    Object.keys(data).forEach((key) => {
      const fieldKey: Path<T> = key as Path<T>;

      setError(fieldKey, {
        type: "manual",
        message: data[fieldKey]?.join(", "),
      });
    });

    return;
  }
};

export default handleSubmitApi;
