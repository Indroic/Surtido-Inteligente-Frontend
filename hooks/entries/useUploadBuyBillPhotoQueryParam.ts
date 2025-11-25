import { useQueryState } from "nuqs";
import { parseAsBoolean, createLoader } from "nuqs/server";

export const useSearchQueryParams = () => {
  const key = "uploadBillImage";
  const [uploadBillImage, setUploadBillImage] = useQueryState(
    key,
    parseAsBoolean.withDefault(false),
  );

  return {
    uploadBillImage,
    setUploadBillImage,
    key,
  };
};

export const loadUploadBillImage = createLoader({
  uploadBillImage: parseAsBoolean,
});
