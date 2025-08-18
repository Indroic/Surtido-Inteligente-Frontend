import useVariantIDParam from "@/hooks/inventory/variants/useVariantIDQueryParam";
import { DrawerIDController } from "@/types/details";

const useVariantIDController: DrawerIDController = () => {
  const { variantID: id, setVariantID: setID } = useVariantIDParam();

  return {
    id,
    setID,
    key: "variantID",
  };
};

export default useVariantIDController;
