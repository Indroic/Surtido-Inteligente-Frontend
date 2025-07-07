import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BreadcrumbItemProps } from "@/components/main/BreadCrump";

export type BreadCrumpState = {
  items: BreadcrumbItemProps[];
};

const initialState: BreadCrumpState = {
  items: [
    {
      id: "1",
      href: "/dashboard",
      label: "Dashboard",
    },
  ],
};

export const breadCrumpSlice = createSlice({
  name: "bread",
  initialState,
  reducers: {
    addBread: (state, action: PayloadAction<BreadcrumbItemProps[]>) => {
      action.payload.forEach((item) => {
        const index = state.items.findIndex(
          (existingItem) => existingItem.id === item.id,
        );

        if (index === -1) {
          state.items.push(item);
        }
      });
    },
    removeBread: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    resetBread: (state) => {
      state.items = initialState.items;
    },
  },
});

export const { addBread, removeBread, resetBread } = breadCrumpSlice.actions;

export default breadCrumpSlice.reducer;
