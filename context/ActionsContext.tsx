import { Button } from "@heroui/button";
import React, { createContext, useContext, useState } from "react";

export type BreadActionsContextType = {
  actions: React.ReactElement<typeof Button>[];
  setActions: (actions: React.ReactElement<typeof Button>[]) => void;
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
  const [actions, setActions] = useState<React.ReactElement<typeof Button>[]>(
    [],
  );

  return (
    <BreadActionsContext.Provider value={{ actions, setActions }}>
      {children}
    </BreadActionsContext.Provider>
  );
}

export const useBreadActions = () => useContext(BreadActionsContext);
