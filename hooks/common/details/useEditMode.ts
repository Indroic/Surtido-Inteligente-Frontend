import { useQueryState } from "nuqs";

const useEditMode = () => {
  const [editMode, setEditMode] = useQueryState("editMode", {
    parse: Boolean,
    defaultValue: false,
  });

  return {
    editMode,
    setEditMode,
  };
};

export default useEditMode;
