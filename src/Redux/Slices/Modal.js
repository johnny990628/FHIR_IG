import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: "",
  data: {
    name: "",
    category: "",
    ["npm-name"]: "",
    description: "",
    authority: "",
    country: "",
    language: ["en"],
    implementations: [],
    history: "",
    canonical: "",
    ["ci-build"]: "",
    analysis: {},
    editions: [],
  },
  tag: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { data, type } = action.payload;
      return type === "edit"
        ? {
            ...state,
            isOpen: true,
            type,
            data,
          }
        : {
            ...state,
            isOpen: true,
            type,
          };
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
