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
    language: [],
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
    switchForm: (state, action) => {
      const { tag, tagData } = action.payload;
      return {
        ...state,
        tag,
        tagData,
      };
    },
    createTagData: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [state.tag]: [...state.data[state.tag], data],
        },
      };
    },
    updateTagData: (state, action) => {
      const { data, index } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [state.tag]: state.data[state.tag].map((tag, i) =>
            i === index ? data : tag
          ),
        },
      };
    },
    deleteTagData: (state, action) => {
      const { index } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [state.tag]: state.data[state.tag].filter((_, i) => i !== index),
        },
      };
    },
  },
});

export const {
  openModal,
  closeModal,
  switchForm,
  createTagData,
  updateTagData,
  deleteTagData,
} = modalSlice.actions;

export default modalSlice.reducer;
