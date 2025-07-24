import { useQueryState } from "nuqs";

const useDrawerDetails = () => {
  const [openDetails, setOpenDetails] = useQueryState("openDetails", {
    parse: Boolean,
    defaultValue: false,
  });

  return {
    openDetails,
    setOpenDetails,
  };
};

export default useDrawerDetails;
