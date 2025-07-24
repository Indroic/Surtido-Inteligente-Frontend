import { useQueryState } from "nuqs";
import { createLoader, parseAsString } from "nuqs/server";

const useProductDetails = () => {
  const [productId, setProductId] = useQueryState("productID", {
    parse: String,
  });

  return {
    productId,
    setProductId,
  };
};

export const loadProductsParams = createLoader({
  productID: parseAsString,
});

export default useProductDetails;
