import { ButtonProps } from "@heroui/button";
import { TablerIcon } from "@tabler/icons-react";
import React, { createContext, useContext, useState } from "react";

type ActionType = {
  Icon?: React.ReactElement<TablerIcon>;
  label?: string;
} & ButtonProps;

export type BreadActionsContextType = {
  actions: ActionType[];
  setActions: (actions: ActionType[]) => void;
};

const BreadActionsContext = createContext<BreadActionsContextType>({
  actions: [],
  setActions: () => {},
} as BreadActionsContextType);

export function BreadActionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [actions, setActions] = useState<ActionType[]>([]);

  return (
    <BreadActionsContext.Provider value={{ actions, setActions }}>
      {children}
    </BreadActionsContext.Provider>
  );
}

export const useBreadActions = () => useContext(BreadActionsContext);
