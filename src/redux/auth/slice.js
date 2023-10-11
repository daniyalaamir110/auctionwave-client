import { createSlice } from "@reduxjs/toolkit";
import { login, verify } from "./actions";

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
  reducers: {},
  extraReducers: (builder) => {
    /**
     * Login
     */
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
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
      .addCase(verify.fulfilled, (state) => {
        state.verifying = false;
        state.success = true;
      })
      .addCase(verify.rejected, (state, { payload }) => {
        state.verifying = false;
        state.error = payload;
      });
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
