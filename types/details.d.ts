export type DrawerStateControllerProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onClose: () => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
};

export type DrawerController = () => DrawerStateControllerProps;

export type DrawerIdControllerProps = {
  id: string | null;
  setID: (value: string | null) => void;
};

export type DrawerIDController = () => DrawerIdControllerProps;
