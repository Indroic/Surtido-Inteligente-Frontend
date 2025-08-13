import { ButtonGroup } from "@heroui/button";
import { ToastProps } from "@heroui/toast";

import ButtonSetDetails from "@/components/common/details/ButtonSetDetails";
import DeleteModal from "@/components/common/DeleteModal";
import { addIDQuery } from "@/helpers/apiStringsPathsHelpers";
import { BaseInterface } from "@/types/bases";

type DeleteOptions = {
  url: string;
  title: string;
  description: string;
  segurityText: string;
  secondarySegurityText: string;
  toastProps: {
    title: string;
    description: string;
    color: ToastProps["color"];
  };
};

type TableActionsProps<T extends BaseInterface> = {
  item: T;
  setID: (id: string) => Promise<URLSearchParams>;
  deleteOptions: DeleteOptions;
};

export default function TableActions<T extends BaseInterface>({
  item,
  setID,
  deleteOptions,
}: TableActionsProps<T>) {
  return (
    <ButtonGroup size="sm">
      <DeleteModal
        {...deleteOptions}
        url={addIDQuery(deleteOptions.url, item.id)}
      />
      <ButtonSetDetails callBack={setID} value={item.id} />
    </ButtonGroup>
  );
}
