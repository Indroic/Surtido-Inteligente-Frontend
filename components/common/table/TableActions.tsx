import { ButtonGroup } from "@heroui/button";

import ButtonSetDetails from "@/components/common/details/ButtonSetDetails";
import DeleteModal, { DeleteModalProps } from "@/components/common/DeleteModal";
import { addIDQuery } from "@/helpers/apiStringsPathsHelpers";
import { BaseInterface } from "@/types/bases";
import { DrawerController } from "@/types/details";

type TableActionsProps<T extends BaseInterface> = {
  item: T;
  setID: (id: string) => Promise<URLSearchParams>;
  deleteOptions: DeleteModalProps;
  detailsDrawerStateController?: DrawerController;
};

export default function TableActions<T extends BaseInterface>({
  item,
  setID,
  deleteOptions,
  detailsDrawerStateController,
}: TableActionsProps<T>) {
  return (
    <ButtonGroup size="sm">
      <DeleteModal
        {...deleteOptions}
        item={item}
        url={addIDQuery(deleteOptions.url, item.id)}
      />
      <ButtonSetDetails
        callBack={setID}
        detailsDrawerStateController={detailsDrawerStateController}
        value={item.id}
      />
    </ButtonGroup>
  );
}
