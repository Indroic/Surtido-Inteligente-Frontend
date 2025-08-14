import useIDParam from "@/hooks/common/details/useIDSearchParam";
import { DrawerIDController } from "@/types/details";

const useDefaultDrawerIDController: DrawerIDController = () => {
  const { id, setID } = useIDParam();

  return {
    id,
    setID,
    key: "id",
  };
};

export default useDefaultDrawerIDController;
