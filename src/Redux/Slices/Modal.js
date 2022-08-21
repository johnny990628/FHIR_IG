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
    switchForm: (state, action) => {
      const { tag } = action.payload;
      return {
        ...state,
        tag,
      };
    },
    updateFormData: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        data: { ...state.data, ...data },
      };
    },
    createTagData: (state, action) => {
      const { tagType, data } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [tagType]: [...state.data[tagType], data],
        },
      };
    },
    updateTagData: (state, action) => {
      const { tagType, data, index } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [tagType]: state.data[tagType].map((tag, i) =>
            i === index ? data : tag
          ),
        },
      };
    },
    deleteTagData: (state, action) => {
      const { tagType, index } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [tagType]: state.data[tagType].filter((_, i) => i !== index),
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
  updateFormData,
} = modalSlice.actions;

export default modalSlice.reducer;
