import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: "",
  data: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { data, type } = action.payload;
      return {
        isOpen: true,
        type,
        data,
      };
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
