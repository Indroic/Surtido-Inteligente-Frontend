import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hidden: false, // El valor por defecto
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    // Action para alternar la visibilidad del header
    toggleHeaderVisibility: (state) => {
      state.hidden = !state.hidden;
    },
    // Action para establecer directamente la visibilidad (útil para la carga inicial)
    setHeaderVisibility: (state, action) => {
      state.hidden = action.payload;
    },
  },
});

export const { toggleHeaderVisibility, setHeaderVisibility } =
  headerSlice.actions;

export default headerSlice.reducer;
