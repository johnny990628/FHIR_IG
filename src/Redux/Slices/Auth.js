import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  isLogin: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action) => {
      const { user, isAdmin, isLogin } = action.payload;
      return {
        user,
        isAdmin,
        isLogin,
      };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { auth, logout } = authSlice.actions;

export default authSlice.reducer;
