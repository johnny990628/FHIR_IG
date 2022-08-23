import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slices/Data";
import modalReducer from "./Slices/Modal";
import authReducer from "./Slices/Auth";

export default configureStore({
  reducer: {
    data: dataReducer,
    modal: modalReducer,
    auth: authReducer,
  },
});
