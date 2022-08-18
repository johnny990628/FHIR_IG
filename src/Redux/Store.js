import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slices/Data";
import modalReducer from "./Slices/Modal";

export default configureStore({
  reducer: {
    data: dataReducer,
    modal: modalReducer,
  },
});
