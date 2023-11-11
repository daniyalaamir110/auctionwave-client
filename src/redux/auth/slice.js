import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { login, verify } from "./async-actions";

const initialState = {
  loading: false,
  verifying: false,
  success: false,
  error: null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.success = initialState.success;
      state.error = initialState.error;
      state.user = initialState.user;
      state.verifying = initialState.verifying;
      state.loading = initialState.loading;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      toast.info("Logged out");
    },
    updateUser: (state, { payload }) => {
      state.user = payload;
    },
    updateProfileImage: (state, { payload }) => {
      state.user.profile_image = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * Login
     */
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      /**
       * Verifying token
       */
      .addCase(verify.pending, (state) => {
        state.verifying = true;
        state.error = null;
      })
      .addCase(verify.fulfilled, (state, { payload }) => {
        state.verifying = false;
        state.success = true;
        state.user = payload;
      })
      .addCase(verify.rejected, (state, { payload }) => {
        state.verifying = false;
        state.error = payload;
      });
  },
});

const authReducer = authSlice.reducer;
export const { actions } = authSlice;

export default authReducer;
